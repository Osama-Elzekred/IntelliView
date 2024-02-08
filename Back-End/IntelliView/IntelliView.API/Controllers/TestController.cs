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
    public class TestController(IAiSearchService aiBasedSearchService, IWebHostEnvironment _webHostEnvironment) : ControllerBase
    {
        private readonly IAiSearchService _aiBasedSearchService = aiBasedSearchService;
        public readonly IWebHostEnvironment _webHostEnvironment = _webHostEnvironment;

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

        // Controller Action to handle video upload
        [HttpPost("upload-video")]
        public async Task<IActionResult> UploadVideo(IFormFile video)
        {
            if (video == null || video.Length == 0)
            {
                return BadRequest("No video file provided");
            }

            try
            {
                // Save the uploaded video file to a specific directory on the server
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                var filePath = Path.Combine(uploadsFolder, video.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await video.CopyToAsync(stream);
                }

                return Ok(new { message = "Video uploaded successfully", filePath });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }


    }
}
