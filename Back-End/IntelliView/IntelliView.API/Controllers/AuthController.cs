using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IVerifyService _verifyService;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _configuration;
        public AuthController(IAuthService authService, IVerifyService verifyService, IEmailSender emailSender, IConfiguration configuration)
        {
            _authService = authService;
            _verifyService = verifyService;
            _emailSender = emailSender;
            _configuration = configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model);

            if (result == null)
            {
                return BadRequest();
            }

            if (!result.IsAuthenticated)
                return BadRequest(new { result.Message });

            //SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            string token = await _verifyService.CreateVerfiyTokenAsync(result.Id!);
            result.VerficationToken = token;

            await _emailSender.SendEmailAsync(new EmailDTO
            {
                To = result.Email!,
                Subject = "Verify Your Email Address for IntelliView",
                Body = $"""
                    <div class='container'>
                <div class='header'>
                <img src='https://res.cloudinary.com/djvcgnkbn/image/upload/v1720217560/image-473b08fd-f2cd-4a02-96dc-217cee619512.png' alt='IntelliView Logo'>
                </div>
                <div class='content'>
                <h2>Email Verification</h2>
                <p>Hello,</p>
                <p>Thank you for registering with IntelliView. Please verify your email address by clicking the button below:</p>
                <p style='text-align: center;'>
                <a href='{_configuration.GetSection("Backendserver").Value}/api/verify/{result.Id}/{result.VerficationToken}' class='button'>Verify Your Email</a>
                </p>
                <p>This verification link will expire in 20 minutes.</p>
                <p>If you did not register for an IntelliView account, please ignore this email.</p>
                </div>
                <div class='footer'>
                <p>© 2024 IntelliView. All rights reserved.</p>
                </div>
                </div>
                """
            });
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> GetTokenAsync([FromBody] TokenRequestModel model)
        {
            var result = await _authService.GetTokenAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(new { result.Message });

            if (!string.IsNullOrEmpty(result.RefreshToken))
                SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);
            return Ok(result);
        }
        [HttpPost("addRole")]
        public async Task<IActionResult> AddRoleAsync([FromBody] AddRoleModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.AddRoleAsync(model);

            if (!string.IsNullOrEmpty(result))
                return BadRequest(result);

            return Ok("Role added successfully");
        }
        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (refreshToken is null)
            {
                return BadRequest("The RefreshToken is null");
            }
            var result = await _authService.RefreshTokenAsync(refreshToken);
            if (!result.IsAuthenticated)
                return BadRequest(result);

            SetRefreshTokenInCookie(result.RefreshToken!, result.RefreshTokenExpiration);

            return Ok(result);
        }
        [HttpPost("revokeToken")]
        public async Task<IActionResult> RevokeToken([FromBody] RevokeToken model)
        {
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest("Token is required!");

            var result = await _authService.RevokeTokenAsync(token);

            if (!result)
                return BadRequest("Token is invalid!");

            return Ok();
        }
        private void SetRefreshTokenInCookie(string refreshToken, DateTime expires)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = expires.ToLocalTime(),
                Secure = true,
                IsEssential = true,
                SameSite = SameSiteMode.None
            };

            Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }
    }
}
