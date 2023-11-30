using IntelliView.Models.DTO;
using IntelliView.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IntelliView.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;
        private readonly RoleManager<IdentityRole> _roleManager;
        public AuthService(UserManager<IdentityUser> userManger, IConfiguration config, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManger;
            _config = config;
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
        public async Task<bool> RegisterUser(RegisterDTO user)
        {
            await CreateRolesAsync();
            var identityUser = new IdentityUser
            {
                UserName = user.Email,
                Email = user.Email
            };
            var Role = new IdentityRole
            {
                Name = user.Role
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(identityUser, user.Role);
            }
            return result.Succeeded;
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

        public string GenerateTokenString(LoginDTO user)
        {
            try
            {
                var userRoles = GetRolesByEmailAsync(user.Email).Result;
                if (userRoles is null)
                {
                    throw new InvalidOperationException("User roles not found");
                }
                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role, userRoles.FirstOrDefault()!)
            };

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection
                    ("Jwt:Key").Value!));


                var signingcred = new SigningCredentials
                    (securityKey, SecurityAlgorithms.HmacSha256Signature);
                var securityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["Jwt:TokenExpiryInMinutes"])),
                    issuer: _config.GetSection("Jwt:Issuer").Value,
                    audience: _config.GetSection("Jwt:audience").Value,
                    signingCredentials: signingcred);

                return new JwtSecurityTokenHandler().WriteToken(securityToken);
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                throw new InvalidOperationException("Error generating token", ex);
            }
        }

        public async Task<List<string>?> GetRolesByEmailAsync(string userEmail)
        {
            try
            {
                // Get the user by email
                var user = await _userManager.FindByEmailAsync(userEmail);

                if (user != null)
                {
                    // Get the roles associated with the user
                    var roles = await _userManager.GetRolesAsync(user);

                    // convert to list of strings and return
                    return [.. roles];
                }

                // User not found
                return null;
            }
            catch (Exception ex)
            {
                // Log the exception for troubleshooting
                throw new InvalidOperationException("Error getting user roles", ex);
            }
        }
    }
}
