using IntelliView.DataAccess.Services.IService;
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
        public verifyController(IAuthService authService, IEmailSender emailSender, IVerifyService verifyService)
        {
            _authService = authService;
            _emailSender = emailSender;
            _verifyService = verifyService;
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
        public async Task<IActionResult> ResendVerifyAsync([FromBody] string model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //var result = await _verifyService.ResendVerifyEmailAsync(model);

            //if (!result)
            //    return BadRequest("Verification failed");

            return Ok("Verification successful");
        }
    }
}
