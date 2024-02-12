using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using IntelliView.Models.Models;
using RestSharp;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;
        private readonly IEmailSender _emailSender;
        private readonly UserManager<ApplicationUser> _userManager;
        public PasswordController(IPasswordService passwordService , IEmailSender emailSender, UserManager<ApplicationUser> userManager)
        {
            _passwordService = passwordService;
            _emailSender = emailSender;
            _userManager = userManager;
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPasswordAsync([FromBody] string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _passwordService.CheckEmailAsync(email);

            if (result== string.Empty)
                return BadRequest("Invalid Email");

            string body = await _passwordService.CreateResetLink(email);

            await _emailSender.SendEmailAsync(new EmailDTO
            {
                To = email,
                Subject = "Reset your Password",
                Body = body

            });

            return Ok("Reset Password Link Sent to your Email");
        }

        [HttpPost("reset-password/{userId}/{token}")]
        public async Task<IActionResult> ResetPasswordAsync(string userId, string token, [FromBody] ResetPasswordDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (model.NewPassword!=model.ConfirmPassword)
                return BadRequest("Passwords doesn't match");

            model.UserId = userId;
            model.Token = token;

            var result = await _passwordService.ResetPasswordAsync(model);

            if (!result)
                return BadRequest("Reset Password Failed");

            return Ok("Reset Password Successfully");
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO model)
        {
            // Find user in data store
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
                return NotFound(new {message = "User not found." });

            // Change password
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if (!changePasswordResult.Succeeded)
            {
                return BadRequest(new { message="Failed to change password." });
            }

            return Ok(new { message = "Password Changed Succesfully" });
        }
    }
}
