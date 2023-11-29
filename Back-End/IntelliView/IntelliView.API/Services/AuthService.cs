using IntelliView.Models.Models;
using Microsoft.AspNetCore.Identity;
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
        public AuthService(UserManager<IdentityUser> userManger,IConfiguration config)
        {
            _userManager = userManger;
            _config = config;
        }

        

        public async Task<bool> RegisterUser(AppUser user)
        {
            var identityUser = new IdentityUser
            {
                UserName = user.UserName,
                Email = user.UserName
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);
            return result.Succeeded;
        }

        public async Task<bool> Login(AppUser user)
        {
            var identityUser = await _userManager.FindByEmailAsync(user.UserName);
            if(identityUser is null)
            {
                return false;
            }
            return await _userManager.CheckPasswordAsync(identityUser, user.Password);
        }

        public string GenerateTokenString(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.UserName),
                new Claim(ClaimTypes.Role,"Admin"),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection
                ("Jwt:Key").Value));


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
    }
}
