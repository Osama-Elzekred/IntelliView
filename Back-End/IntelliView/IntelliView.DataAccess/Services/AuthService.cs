using IntelliView.Models.DTO;
using IntelliView.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
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
        public AuthService(UserManager<IdentityUser> userManger,IConfiguration config, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManger;
            _config = config;
        }


        private async Task CreateRolesAsync()
        {
            // Create "Company" role if it doesn't exist
            if (!_roleManager.RoleExistsAsync(SD.ROLE_ADMIN).GetAwaiter().GetResult())
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
                UserName= user.Email,
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
            if(identityUser is null)
            {
                return false;
            }
            return await _userManager.CheckPasswordAsync(identityUser, user.Password);
        }

        public string GenerateTokenString(LoginDTO user)
        {
           var userRoles = GetRolesByEmailAsync(user.Email).GetAwaiter().GetResult();
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role,userRoles[0])
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection
                ("Jwt:Key").Value!));


            var signingcred = new SigningCredentials
                (securityKey,SecurityAlgorithms.HmacSha256Signature);
            var securityToken = new JwtSecurityToken(
                claims:claims,
                expires:DateTime.Now.AddMinutes(60),
                issuer:_config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:audience").Value,
                signingCredentials:signingcred);
            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
        public async Task<List<string>> GetRolesByEmailAsync(string userEmail)
        {
            // Get the user by email
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user != null)
            {
                // Get the roles associated with the user
                var roles = await _userManager.GetRolesAsync(user);

                return roles.ToList();
            }

            // User not found
            return null;
        }
    }
}
