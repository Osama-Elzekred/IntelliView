using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.Models;
using IntelliView.Utility;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    internal class PasswordService : IPasswordService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public PasswordService(UserManager<ApplicationUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }
        public async Task<bool> CheckEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user != null;
        }

        public async Task<string> CreateResetLink(string email)
        {
            string token = GenerateRandomToken.createRandomToken();
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null) { return "Error from server try send again :)"; }
            
            user.ResetPassExpiredAt = DateTime.UtcNow.AddMinutes(20);

            await _userManager.UpdateAsync(user);


            string link = $"https://localhost:7049/api/password/reset-password/{user.Id}/{token}";

            return $"You can reset your password by clicking this link: <a href='{link}'>Reset Password</a> ";
        }
    }
}
