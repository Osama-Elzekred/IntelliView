using IntelliView.DataAccess.Services;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using IntelliView.Utility.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public async Task<bool> VerifyEmailAsync(string userId, string token)
        {
            //var user = await _userManager.Users.FirstOrDefaultAsync(u=>(token==u.VerificationToken && userId==u.Id ));

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return false;
            if (user.VerificationToken != token)
                return false;

            //|| user.VerifyExpiredAt < DateTime.UtcNow
            //user.VerfiedAt = DateTime.UtcNow;
            user.VerificationToken = string.Empty;
            user.Verified = true;

            // create jwt token

            var jwtSecurityToken = await CreateJwtToken(user);
            var refreshToken = JwtToken.GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);

            await _userManager.UpdateAsync(user);
            return true;

        }

        public async Task<AuthModel> RegisterAsync(RegisterDTO model)
        {
            #region  Validation
            // Check for null or empty values
            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
            {
                return new AuthModel { Message = "Username, Email, and Password are required." };
            }

            // Validate email format
            if (!IsValidEmail(model.Email))
            {
                return new AuthModel { Message = "Invalid email format." };
            }

            // Check if the password contains any white spaces
            if (model.Password.Contains(" "))
            {
                return new AuthModel { Message = "Password cannot contain white spaces." };
            }

            // Ensure password meets complexity requirements (example: at least 8 characters)
            if (model.Password.Length < 8)
            {
                return new AuthModel { Message = "Password must be at least 8 characters long." };
            }

            // Check if the username is already registered
            if (await _userManager.FindByNameAsync(model.Username) is not null)
            {
                return new AuthModel { Message = "Username is already registered!" };
            }

            // Check if the email is already registered
            if (await _userManager.FindByEmailAsync(model.Email) is not null)
            {
                return new AuthModel { Message = "Email is already registered!" };
            }

            #endregion
            // Create the user object
            ApplicationUser user = CreateUserObject(model);
            var result = await _userManager.CreateAsync(user, model.Password);

            // Check if the user creation succeeded
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(error => error.Description));
                return new AuthModel { Message = errors };
            }

            // Assign role to the user
            var role = model.Role;
            await _userManager.AddToRoleAsync(user, role);

            // Create JWT token
            var jwtSecurityToken = await CreateJwtToken(user);

            // Generate and add refresh token
            var refreshToken = JwtToken.GenerateRefreshToken();
            user.RefreshTokens?.Add(refreshToken);
            await _userManager.UpdateAsync(user);

            // Return the authentication model
            return new AuthModel
            {
                Email = user.Email,
                IsAuthenticated = true,
                Roles = new List<string> { role },
                Username = user.UserName,
                Id = user.Id
            };
        }

        // Helper method to validate email format
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = roles.Select(role => new Claim("roles", role));

            var claims = new[]
            {

                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id),
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

        private static ApplicationUser CreateUserObject(RegisterDTO model)
        {
            ApplicationUser user;

            switch (model.Role.ToLower())
            {
                case SD.ROLE_COMPANY:
                    user = new CompanyUser();
                    break;
                case SD.ROLE_USER:
                    user = new IndividualUser();
                    break;
                default:
                    user = new ApplicationUser();
                    break;
            }

            user.UserName = model.Username;
            user.Email = model.Email;

            return user;
        }
        public async Task<bool> Login(LoginDTO user)
        {
            var identityUser = await _userManager.FindByEmailAsync(user.Email);

            return identityUser is not null && await _userManager.CheckPasswordAsync(identityUser, user.Password);
        }
        public async Task<AuthModel> GetTokenAsync(TokenRequestModel model)
        {
            var authModel = new AuthModel();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email or Password is incorrect!";
                authModel.IsAuthenticated = false;
                return authModel;
            }
            //email verification
            if (user.Verified == false)
            {
                authModel.Message = "Email is not verified!";
                authModel.IsAuthenticated = false;
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
            authModel.Id = user.Id;
            authModel.ImageURL = user.ImageURl;

            var activeRefreshToken = user.RefreshTokens?.FirstOrDefault(t => t.IsActive);

            if (activeRefreshToken is not null)
            {
                authModel.RefreshToken = activeRefreshToken.Token;
                authModel.RefreshTokenExpiration = activeRefreshToken.ExpiresOn;
            }
            else
            {
                var refreshToken = JwtToken.GenerateRefreshToken();
                authModel.RefreshToken = refreshToken.Token;
                authModel.RefreshTokenExpiration = refreshToken.ExpiresOn;

                user.RefreshTokens ??= new List<RefreshToken>();
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

        public async Task<AuthModel> RefreshTokenAsync(string token)
        {
            var authModel = new AuthModel();

            var user = await _userManager.Users
            .Include(u => u.RefreshTokens)
            .SingleOrDefaultAsync(u => u.RefreshTokens!.Any(t => t.Token == token));

            if (user == null)
            {
                authModel.Message = "Invalid token";
                return authModel;
            }

            var refreshToken = user.RefreshTokens!.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
            {
                authModel.Message = "Inactive token";
                return authModel;
            }

            refreshToken.RevokedOn = DateTime.UtcNow;

            var newRefreshToken = JwtToken.GenerateRefreshToken();
            user.RefreshTokens!.Add(newRefreshToken);
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
            var user = await _userManager.Users
              .Include(u => u.RefreshTokens)
              .SingleOrDefaultAsync(u => u.RefreshTokens!.Any(t => t.Token == token));

            if (user == null)
                return false;

            var refreshToken = user.RefreshTokens!.Single(t => t.Token == token);

            if (!refreshToken.IsActive)
                return false;

            refreshToken.RevokedOn = DateTime.UtcNow;

            await _userManager.UpdateAsync(user);

            return true;
        }

    }
}
