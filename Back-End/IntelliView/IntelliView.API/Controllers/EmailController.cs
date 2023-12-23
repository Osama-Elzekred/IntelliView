using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        public EmailController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }
        [HttpPost]
        public async Task<IActionResult> SendEmail(EmailDTO req)
        {
            await _emailSender.SendEmailAsync(req);
            return Ok();
        }
    }
}
