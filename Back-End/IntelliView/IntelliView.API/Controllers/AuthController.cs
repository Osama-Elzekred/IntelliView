using IntelliView.API.Services;
using IntelliView.Models.DTO;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        //private readonly UserManager<IdentityRole> _identityRole;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDTO user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid data format");
                }

                if (!IsValidRole(user.Role))
                {
                    return BadRequest("Invalid role");
                }

                user.Role = MapRole(user.Role);

                if (await _authService.RegisterUser(user))
                {
                    return Ok("Registration successful");
                }

                return BadRequest("Something went wrong during registration");
            }
            catch
            {
                // Log the exception for troubleshooting
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid data format");
                }

                if (await _authService.Login(user))
                {
                    var tokenString = _authService.GenerateTokenString(user);
                    return Ok(tokenString);
                }

                return Unauthorized("Invalid credentials");
            }
            catch
            {
                // Log the exception for troubleshooting
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            // Get the user's email from the claims
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            // Perform any necessary cleanup or additional logout logic

            // Optionally, sign the user out if using cookies
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            // Return a successful response
            return Ok("Logout successful");
        }

        private bool IsValidRole(string role)
        {
            return role?.ToLower() switch
            {
                "admin" => true,
                "company" => true,
                "user" => true,
                _ => false
            };
        }

        private string MapRole(string role)
        {
            return role?.ToLower() switch
            {
                "admin" => SD.ROLE_ADMIN,
                "company" => SD.ROLE_COMPANY,
                "user" => SD.ROLE_USER,
                _ => null
            !
            };
        }
    }
}
