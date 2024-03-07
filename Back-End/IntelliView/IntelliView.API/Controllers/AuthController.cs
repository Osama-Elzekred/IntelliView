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
        private readonly IEmailSender _emailSender;
        private readonly IVerifyService _verifyService;
        public AuthController(IAuthService authService, IEmailSender emailSender, IVerifyService verifyService)
        {
            _authService = authService;
            _emailSender = emailSender;
            _verifyService = verifyService;
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

            //string token = await _verifyService.CreateVerfiyTokenAsync(result.Id!);
            //result.VerficationToken = token;

            //await _emailSender.SendEmailAsync(new EmailDTO
            //{
            //    To = result.Email!,
            //    Subject = "Verify your email",
            //    Body = $"Please verify your email by clicking this link: <a href='https://localhost:7049/api/verify/{result.Id}/{result.VerficationToken}'>Verify</a> " +
            //    $"This Link Expire in 20 minutes"
            //});
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
