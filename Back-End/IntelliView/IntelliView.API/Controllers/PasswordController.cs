using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IntelliView.Models.DTO;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PasswordController : ControllerBase
    {
        private readonly IPasswordService _passwordService;
        private readonly IEmailSender _emailSender;
        public PasswordController(IPasswordService passwordService , IEmailSender emailSender)
        {
            _passwordService = passwordService;
            _emailSender = emailSender;

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
    }
}
