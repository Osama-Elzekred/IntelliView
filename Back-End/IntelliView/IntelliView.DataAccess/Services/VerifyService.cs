using IntelliView.Models.Models;
using IntelliView.Utility.Settings;
using IntelliView.Utility;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntelliView.DataAccess.Services.IService;

namespace IntelliView.DataAccess.Services
{
    public class VerifyService : IVerifyService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public VerifyService(UserManager<ApplicationUser> userManger)
        {
            _userManager = userManger;
        }


        public async Task<string> CreateVerfiyTokenAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            user!.VerificationToken = GenerateRandomToken.createRandomToken();
            user.VerifyExpiredAt = DateTime.UtcNow.AddMinutes(20);
            await _userManager.UpdateAsync(user);
            return user.VerificationToken;
        }
    }
}
