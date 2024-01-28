using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = SD.ROLE_COMPANY)]
    public class TestController : ControllerBase
    {
        private readonly IAiSearchService _aiBasedSearchService;
        public TestController(IAiSearchService aiBasedSearchService)
        {
            _aiBasedSearchService = aiBasedSearchService;
        }
        [HttpGet]
        public string Get()
        {
            return "you hit me";
        }
        [HttpGet("GetAiBasedResult")]
        public async Task<IActionResult> GetAiBasedResult(string searchText)
        {
            var result = await _aiBasedSearchService.GetAiBasedResult(searchText);
            return Ok(result);

        }
    }
}
