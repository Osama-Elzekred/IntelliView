using IntelliView.API.Services;
using IntelliView.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authServeice)
        {
            _authService = authServeice;
        }
        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(AppUser user)
        {
            if (await _authService.RegisterUser(user))
            {
                return Ok("Done");
            }
                return BadRequest("something webt wrong");
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(AppUser user)
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
