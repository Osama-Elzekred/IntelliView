using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
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
    public class TestController : ControllerBase
    {
        private readonly IAiSearchService _aiBasedSearchService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConfiguration Configuration;
        private readonly IAvatarService _avatarService;
        private readonly IAIModelApiService _aiModelApiService;
        private readonly IUploadFilesToCloud _uploadFilesToCloud;
        private readonly IEmailSender _emailSender;
        public TestController(IConfiguration configuration, IAiSearchService aiBasedSearchService,
             IWebHostEnvironment webHostEnvironment, IAvatarService avatarService, IAIModelApiService aIModelApiService,
             IUploadFilesToCloud uploadFilesToCloud,IEmailSender emailSender)
        {
            Configuration = configuration;
            _aiBasedSearchService = aiBasedSearchService;
            _webHostEnvironment = webHostEnvironment;
            _avatarService = avatarService;
            _aiModelApiService = aIModelApiService;
            _uploadFilesToCloud = uploadFilesToCloud;
            _emailSender = emailSender;
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




        [HttpPost("cloudinary")]
        public async Task<IActionResult> TestCloudinary(IFormFile formFile)
        {
            string res = await _uploadFilesToCloud.UploadVideo(formFile, formFile.FileName);

            return Ok(res );
        }

        [HttpPost("DeleteCloudinary")]
        public async Task<bool> TestCloudinary2(string url)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;
                string publicId = url.Substring(url.LastIndexOf("/") + 1, url.LastIndexOf(".") - url.LastIndexOf("/") - 1);

                var deleteParams = new DeletionParams(publicId);
                var result = await cloudinary.DestroyAsync(deleteParams);
                if (result.Result == "ok")
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #region Gemini AI
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
            // Split the API response by "**CustQuestion:**" to separate questions and answers
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
                string question = parts[0].Trim();
                string answer = parts.Length > 1 ? parts[1].Trim() : ""; // Handle cases where no answer is provided

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
            public string? Question { get; set; }

            [JsonProperty("Answer")]
            public string? Answer { get; set; }
        }

        # endregion





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

        [HttpGet("call-azure-avatar")]
        public async Task<IActionResult> CallAzureAvatar(string InputText, string Voice)
        {
            var jobId = await _avatarService.SubmitSynthesis(inputText: InputText, voice: Voice);
            return Ok(jobId);
        }
        [HttpGet("list-azure-avatar")]
        public async Task<IActionResult> ListAzureAvatar()
        {
            var jobs = await _avatarService.ListSynthesisJobs();
            return Ok(jobs);
        }

        [HttpPost("getCVmatch")]
        public async Task<IActionResult> GetCVmatch(IFormFile cv)
        {
            var result = await _aiModelApiService.GetCVmatch(cv,
                "ASP.Net, C#, JavaScript, VB Script, HTML, CSS and SQL.Designs, develops, troubleshoots, debugs, and" +
                " implements software code using the following web development components: Java, JSP and XHTML with heavy" +
                " reliance on JavaScript code for DHTML interfaces. Frequent use and application of technical standards," +
                " principles, theories, concepts, and techniques. Provides solutions to a variety of technical problems" +
                " of moderate scope and complexity. Experience developing web applications using the ASP.NET MVC Framework" +
                " is desired. Microsoft Web Developer Backend Development Skills Specifically Strong C# & SQL Server skills " +
                "required for backend development required Experience With API Testing Tools RequiredADO and Agile Experience" +
                " required MVC .Net Core and Blazor knowledge would be beneficial");
            return Ok(result);
        }
        [HttpPost("getAnalizeData") ]
        public async Task<IActionResult> GetAnalizeData(string videoLink)
        {
            var result = await _aiModelApiService.GetAnalyseVideoData(videoLink);
            return Ok(result);
        }
        //[HttpPost("revciveData")]
        //public Task<IActionResult> RevciveData(string data)
        //{
        //    Console.WriteLine(data);
        //    return Task.FromResult<IActionResult>(Ok(data));
        //}

        // Test sending email
        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail(EmailDTO email)
        {
            try
            {
                await _emailSender.SendEmailAsync(email);
                return Ok("Email sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
        
    }
}
