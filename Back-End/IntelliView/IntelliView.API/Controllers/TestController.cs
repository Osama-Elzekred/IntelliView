using IntelliView.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = SD.ROLE_ADMIN)]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "you hit me";
        }
    }
}
