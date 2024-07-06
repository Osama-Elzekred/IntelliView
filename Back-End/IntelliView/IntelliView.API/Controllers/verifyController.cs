using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class verifyController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IEmailSender _emailSender;
        private readonly IVerifyService _verifyService;
        private readonly IPasswordService _passwordService;
        private readonly IConfiguration _configuration;
        public verifyController(IAuthService authService, IEmailSender emailSender, IVerifyService verifyService,
            IPasswordService passwordService,IConfiguration configuration)
        {
            _authService = authService;
            _emailSender = emailSender;
            _verifyService = verifyService;
            _passwordService = passwordService;
            _configuration = configuration;
        }
        [HttpGet("{userId}/{token}")]
        public async Task<IActionResult> VerifyAsync(string userId, string token)
        {

            var result = await _authService.VerifyEmailAsync(userId, token);

            if (!result)
                return BadRequest("Verification failed");

            return Ok("Verification successful");
        }
        [HttpPost("resend-verify")]
        public async Task<IActionResult> ResendVerifyAsync([FromBody] string email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = await _passwordService.CheckEmailAsync(email);

            if (userId == string.Empty)
                return BadRequest("Resend email verify failed");

            var token = await _verifyService.CreateVerfiyTokenAsync(userId);

            await _emailSender.SendEmailAsync(new EmailDTO
            {
                To = email,
                Subject = "Verify your email",
                Body = $"Please verify your email by clicking this link: <a href='https://intelliview1.azurewebsites.net/api/verify/{userId}/{token}'>Verify</a> " +
                $"This Link Expire in 20 minutes"
            });

            return Ok("Email sent successfully");
        }

        [HttpPost("contact-us")]
        public async Task<IActionResult> ContactUsAsync([FromBody] ContactUsDTO contactUs)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _emailSender.SendEmailAsync(new EmailDTO
            {
                To = _configuration["ContactUsEmail"]!,
                Subject = "Contact Us",
                Body = $"Name: {contactUs.Name} <br> Email: {contactUs.Email} <br> Message: {contactUs.Message}"
            });
            
            return Ok("Email sent successfully");

        }
    }
}
