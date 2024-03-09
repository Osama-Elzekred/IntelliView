using IntelliView.API.Errors;
using IntelliView.API.Infrastructure;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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


        [HttpGet("GeminiAI")]
        public async Task<IActionResult> GeminiAI(string category, string level, int numberOfQuestions)
        {
            // Construct the prompt based on the category and level
            string prompt = $"Generate a {numberOfQuestions} text interview question with model answers in the {category} category and {level} level. Format: {{Question}}; {{Answer}}";

            // Call the AI service with the constructed prompt
            var result = await _aiBasedSearchService.GeminiAiApi(prompt);

            // Replace unicode escape sequences with corresponding characters
            string formattedResponse = System.Text.RegularExpressions.Regex.Unescape(result);

            // Parse the formatted response to extract question and answer
            var response = ParseGeminiApiResponse(formattedResponse);


            return Ok(response);
        }

        private List<InterviewResponse> ParseGeminiApiResponse(string apiResponse)
        {
            // Split the API response by "**Question:**" to separate questions and answers
            var qaPairs = apiResponse.Split("**Question:**");

            // Initialize a list to store the parsed interview responses
            List<InterviewResponse> interviewResponses = new List<InterviewResponse>();

            // Iterate over each question-answer pair and parse them
            foreach (var pair in qaPairs)
            {
                // Trim any leading/trailing whitespace from the pair
                string trimmedPair = pair.Trim();

                if (string.IsNullOrWhiteSpace(trimmedPair))
                {
                    continue; // Skip empty or whitespace-only pairs
                }

                // Split the pair into question and answer parts
                var parts = trimmedPair.Split("**Answer:**");

                // Trim any leading/trailing whitespace from the question and answer
                string question = parts[0]?.Trim();
                string answer = parts.Length > 1 ? parts[1]?.Trim() : ""; // Handle cases where no answer is provided

                // Create an InterviewResponse object and add it to the list
                interviewResponses.Add(new InterviewResponse
                {
                    Question = question,
                    Answer = answer
                });
            }

            return interviewResponses;
        }



        public class InterviewResponse
        {
            [JsonProperty("Question")]
            public string Question { get; set; }

            [JsonProperty("Answer")]
            public string Answer { get; set; }
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
