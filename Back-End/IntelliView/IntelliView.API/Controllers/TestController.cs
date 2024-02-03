using IntelliView.API.Errors;
using IntelliView.API.Infrastructure;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
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
        [HttpGet("TestExceptionErrror")]
        public Task<IActionResult> TestExceptionErrror()
        {
            throw new Exception("Test Exception");
        }
        [HttpGet("TestResult")]
        public Result<string> TestResult()
        {

            return Result<string>.Failure(TestErrors.AlreadyRegistered);
        }


        [HttpGet("GetAiBasedResult")]
        public async Task<IActionResult> GetAiBasedResult(string searchText)
        {
            var result = await _aiBasedSearchService.GetAiBasedResult(searchText);
            return Ok(result);

        }
        [HttpPost("AddMultibleDataForm")]
        public Task<IActionResult> AddMultibleDataForm(MultibleFormDataDTO multibleFormDataDTO)
        {
            return Task.FromResult<IActionResult>(Ok(multibleFormDataDTO));
        }
    }
}
