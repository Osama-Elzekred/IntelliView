using IntelliView.API.Services;
using IntelliView.Models.DTO;
using IntelliView.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        //private readonly UserManager<IdentityRole> _identityRole;
        public AuthController(IAuthService authServeice)
        {
            _authService = authServeice;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            switch(user.Role.ToLower())
            {
                case "admin":
                    user.Role = SD.ROLE_ADMIN;
                    break;
                case "company":
                    user.Role = SD.ROLE_COMPANY;
                    break;
                case "user":
                    user.Role = SD.ROLE_USER;
                    break;
                default:
                    return BadRequest();
            }
            if (await _authService.RegisterUser(user))
            {
                return Ok("Done");
            }
                return BadRequest("something went wrong");
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            if(await _authService.Login(user))
            {
                var tokenString = _authService.GenerateTokenString(user);
                return Ok(tokenString);
            }
            return BadRequest();
        }
    }
}
