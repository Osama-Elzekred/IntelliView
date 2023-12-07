using IntelliView.API.Services;
using IntelliView.Models.DTO;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using System.Security.Claims;
using System.Security.Cryptography;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User User1 { get; set; } = new User();
        private readonly IAuthService _authService;
        //private readonly UserManager<IdentityRole> _identityRole;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDTO model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

            return Ok(result);
        }
        [HttpPost("token")]
        public async Task<IActionResult> GetTokenAsync([FromBody] TokenRequestModel model)
        {
            var result = await _authService.GetTokenAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

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

            return Ok(model);
        }
        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var result = await _authService.RefreshTokenAsync(refreshToken);

            if (!result.IsAuthenticated)
                return BadRequest(result);

            SetRefreshTokenInCookie(result.RefreshToken, result.RefreshTokenExpiration);

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
        //[HttpPost("Login")]
        //public async Task<IActionResult> Login([FromBody] LoginDTO user)
        //{
        //    try
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest("Invalid data format");
        //        }

        //        if (await _authService.Login(user))
        //        {
        //            User1.Email = user.Email;
        //            User1.Password = user.Password;
        //            var tokenString = _authService.GenerateTokenString(user);
        //            User1.RefreshToken = tokenString;
        //            var refreshToken = GenerateRefreshToken();
        //            SetRefreshToken(refreshToken);
        //            return Ok(tokenString);
        //        }

        //        return Unauthorized("Invalid credentials");
        //    }
        //    catch
        //    {
        //        // Log the exception for troubleshooting
        //        return StatusCode(500, "Internal Server Error");
        //    }
        //}

        //[Authorize]
        //[HttpPost("Logout")]
        //public async Task<IActionResult> Logout()
        //{
        //    // Get the user's email from the claims
        //    var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

        //    // Perform any necessary cleanup or additional logout logic

        //    // Optionally, sign the user out if using cookies
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        //    // Return a successful response
        //    return Ok("Logout successful");
        //}

        //private bool IsValidRole(string role)
        //{
        //    return role?.ToLower() switch
        //    {
        //        "admin" => true,
        //        "company" => true,
        //        "user" => true,
        //        _ => false
        //    };
        //}

        //private string MapRole(string role)
        //{
        //    return role?.ToLower() switch
        //    {
        //        "admin" => SD.ROLE_ADMIN,
        //        "company" => SD.ROLE_COMPANY,
        //        "user" => SD.ROLE_USER,
        //        _ => null
        //    !
        //    };
        //}
        
        //[HttpPost("refresh-token")]
        //public async Task<ActionResult<string>> RefreshToken(LoginDTO user)
        //{
        //        var refreshToken = Request.Cookies["refreshToken"];
        //        if (!User1.RefreshToken.Equals(refreshToken))
        //        {
        //            return Unauthorized("Invalid refresh token");
        //        }
        //        else if (User1.TokenExpires < DateTime.UtcNow)
        //        {
        //            return Unauthorized("Refresh token expired");
        //        }
        //        var tokenString = _authService.GenerateTokenString(user);
        //        var newRefreshToken = GenerateRefreshToken();
        //        SetRefreshToken(newRefreshToken);
        //        return Ok(tokenString);
        //}
        //private RefreshToken GenerateRefreshToken()
        //{
        //    var refreshToken = new RefreshToken
        //    {
        //        Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
        //        Expires = DateTime.Now.AddDays(10),
        //        Created = DateTime.Now.ToLocalTime()
        //    };
        //    return refreshToken;
        //}
        //private void SetRefreshToken(RefreshToken refreshToken)
        //{
        //    var cookieOptions = new CookieOptions
        //    {
        //        HttpOnly = true,
        //        Expires = refreshToken.Expires
        //    };
        //    Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        //    User1.RefreshToken = refreshToken.Token;
        //    User1.TokenCreated = refreshToken.Created;
        //    User1.TokenExpires = refreshToken.Expires;
        //}
    }
}
