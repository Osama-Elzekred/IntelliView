using Azure;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using IntelliView.Utility.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using RefreshToken = IntelliView.Models.DTO.RefreshToken;

namespace IntelliView.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;
        public AuthService(UserManager<ApplicationUser> userManger, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _roleManager = roleManager;
            _userManager = userManger;
            _jwt = jwt.Value;
        }

        private async Task CreateRolesAsync()
        {
            // Create "Company" role if it doesn't exist
            if (!await _roleManager.RoleExistsAsync(SD.ROLE_ADMIN))
            {
                await _roleManager.CreateAsync(new IdentityRole(SD.ROLE_ADMIN));
                await _roleManager.CreateAsync(new IdentityRole(SD.ROLE_COMPANY));
                await _roleManager.CreateAsync(new IdentityRole(SD.ROLE_USER));
            }
        }
        public async Task<AuthModel> RegisterAsync(RegisterDTO model)
        {
            await CreateRolesAsync();
            if (await _userManager.FindByEmailAsync(model.Email) is not null)
                return new AuthModel { Message = "Email is already registered!" };

            if (await _userManager.FindByNameAsync(model.Username) is not null)
                return new AuthModel { Message = "Username is already registered!" };

            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;

                foreach (var error in result.Errors)
                    errors += $"{error.Description},";

                return new AuthModel { Message = errors };
            }
            var Role = model.Role;
            await _userManager.AddToRoleAsync(user, Role);

            var jwtSecurityToken = await CreateJwtToken(user);

            var refreshToken = GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { "User" },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Username = user.UserName,
                RefreshToken = refreshToken.Token,
                RefreshTokenExpiration = refreshToken.ExpiresOn
            };
        }
        public async Task<bool> Login(LoginDTO user)
        {
            var identityUser = await _userManager.FindByEmailAsync(user.Email);
            if (identityUser is null)
            {
                return false;
            }
            return await _userManager.CheckPasswordAsync(identityUser, user.Password);
        }
        public async Task<AuthModel> GetTokenAsync(TokenRequestModel model)
        {
            var authModel = new AuthModel();

            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email or Password is incorrect!";
                return authModel;
            }

            var jwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user);

            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.Username = user.UserName;
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.Roles = rolesList.ToList();

            if (user.RefreshTokens.Any(t => t.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.FirstOrDefault(t => t.IsActive);
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var refreshToken = GenerateRefreshToken();
                authModel.RefreshToken = refreshToken.Token;
                authModel.RefreshTokenExpiration = refreshToken.ExpiresOn;
                user.RefreshTokens.Add(refreshToken);
                await _userManager.UpdateAsync(user);
            }

            return authModel;
        }
        public async Task<string> AddRoleAsync(AddRoleModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user is null || !await _roleManager.RoleExistsAsync(model.Role))
                return "Invalid user ID or Role";

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return "User already assigned to this role";

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            return result.Succeeded ? string.Empty : "Something went wrong";
        }
        private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }
        public async Task<AuthModel> RefreshTokenAsync(string token)
        {
            var authModel = new AuthModel();

            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
            {
                authModel.Message = "Invalid token";
                return authModel;
            }

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
            {
                authModel.Message = "Inactive token";
                return authModel;
            }

            refreshToken.RevokedOn = DateTime.UtcNow;

            var newRefreshToken = GenerateRefreshToken();
            user.RefreshTokens.Add(newRefreshToken);
            await _userManager.UpdateAsync(user);

            var jwtToken = await CreateJwtToken(user);
            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            authModel.Email = user.Email;
            authModel.Username = user.UserName;
            var roles = await _userManager.GetRolesAsync(user);
            authModel.Roles = roles.ToList();
            authModel.RefreshToken = newRefreshToken.Token;
            authModel.RefreshTokenExpiration = newRefreshToken.ExpiresOn;

            return authModel;
        }
        public async Task<bool> RevokeTokenAsync(string token)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

            if (user == null)
                return false;

            var refreshToken = user.RefreshTokens.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow;

            await _userManager.UpdateAsync(user);

            return true;
        }
        private RefreshToken GenerateRefreshToken()
        {
            var randomNumber = new byte[32];

            using var generator = new RNGCryptoServiceProvider();

            generator.GetBytes(randomNumber);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomNumber),
                ExpiresOn = DateTime.UtcNow.AddDays(10),
                CreatedOn = DateTime.UtcNow
            };
        }
        //public async Task<bool> RegisterUser(RegisterDTO user)
        //{
        //    await CreateRolesAsync();
        //    var identityUser = new IdentityUser
        //    {
        //        UserName = user.Email,
        //        Email = user.Email
        //    };
        //    var Role = new IdentityRole
        //    {
        //        Name = user.Role
        //    };

        //    var result = await _userManager.CreateAsync(identityUser, user.Password);
        //    if (result.Succeeded)
        //    {
        //        await _userManager.AddToRoleAsync(identityUser, user.Role);
        //    }
        //    return result.Succeeded;
        //}



        //public async Task<bool> Login(LoginDTO user)
        //{
        //    var identityUser = await _userManager.FindByEmailAsync(user.Email);
        //    if (identityUser is null)
        //    {
        //        return false;
        //    }
        //    return await _userManager.CheckPasswordAsync(identityUser, user.Password);
        //}

        //public string GenerateTokenString(LoginDTO user)
        //{
        //    try
        //    {
        //        var userRoles = GetRolesByEmailAsync(user.Email).Result;
        //        if (userRoles is null)
        //        {
        //            throw new InvalidOperationException("User roles not found");
        //        }
        //        var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Email,user.Email),
        //        new Claim(ClaimTypes.Role, userRoles.FirstOrDefault()!)
        //    };

        //        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection
        //            ("Jwt:Key").Value!));


        //        var signingcred = new SigningCredentials
        //            (securityKey, SecurityAlgorithms.HmacSha256Signature);
        //        var securityToken = new JwtSecurityToken(
        //            claims: claims,
        //            expires: DateTime.Now.ToLocalTime().AddMinutes(Convert.ToDouble(_config["Jwt:TokenExpiryInMinutes"])),
        //            issuer: _config.GetSection("Jwt:Issuer").Value,
        //            audience: _config.GetSection("Jwt:audience").Value,
        //            signingCredentials: signingcred);
        //        DateTime expirationTime = securityToken.ValidTo;

        //        return new JwtSecurityTokenHandler().WriteToken(securityToken);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception for troubleshooting
        //        throw new InvalidOperationException("Error generating token", ex);
        //    }
        //}

        //public async Task<List<string>?> GetRolesByEmailAsync(string userEmail)
        //{
        //    try
        //    {
        //        // Get the user by email
        //        var user = await _userManager.FindByEmailAsync(userEmail);

        //        if (user != null)
        //        {
        //            // Get the roles associated with the user
        //            var roles = await _userManager.GetRolesAsync(user);

        //            // convert to list of strings and return
        //            return [.. roles];
        //        }

        //        // User not found
        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception for troubleshooting
        //        throw new InvalidOperationException("Error getting user roles", ex);
        //    }
        //}

    }
}
