using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    public class PasswordService : IPasswordService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSender _emailSender;

        public PasswordService(UserManager<ApplicationUser> userManager, IEmailSender emailSender)
        {
            _userManager = userManager;
            _emailSender = emailSender;
        }

        public async Task<bool> ChangePasswordAsync(ChangePasswordDTO model)
        {

            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)return false;

            // Change password
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            return changePasswordResult.Succeeded;
        }

        public async Task<string> CheckEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null) { return string.Empty; }
            return user.Id;
        }

        public async Task<string> CreateResetLink(string email)
        {
            string token = GenerateRandomToken.createRandomToken(5);
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null) { return "Error from server try send again :)"; }
            
            user.ResetPassExpiredAt = DateTime.UtcNow.AddMinutes(20);
            user.ResetPassToken = token;
            await _userManager.UpdateAsync(user);

            return $"Your reset password code is : {token} ";
        }
        public async Task<bool> ResetPasswordAsync(ResetPasswordDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email!);
            if(user == null || user.ResetPassExpiredAt < DateTime.UtcNow || user.ResetPassToken != model.Token)
                 return false;

            user.ResetPassToken = "";
            user.ResetPassExpiredAt = DateTime.UtcNow;
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, model.NewPassword!);
            await _userManager.UpdateAsync(user);

            return true;
        }
    }
}
