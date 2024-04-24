using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using IntelliView.Utility.Settings;
using Mailosaur.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Validations;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(policy: "UserOrCompany")]
    public class JobApplicationController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IUploadFilesToCloud _uploadFilesToCloud;
        private readonly IEmailSender _emailSender;
        public JobApplicationController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment webHostEnvironment
            ,IUploadFilesToCloud uploadFilesToCloud, IEmailSender emailSender)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _uploadFilesToCloud = uploadFilesToCloud;
            _emailSender = emailSender;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJobById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id);

            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }



        [HttpGet("AllJobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetAllJobs()
        {
            var jobs = await _unitOfWork.Jobs.GetAllAsync();
            return Ok(jobs);
        }

        [HttpPost("submitAnswers")]
        public async Task<IActionResult> SubmitAnswers([FromForm] JobApplicationDto model)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return NotFound(new {Message= "UserId not found" });
            }
            var job = await _unitOfWork.Jobs.GetByIdAsync(model.JobId);
            if (job == null)
            {
                return NotFound(new { Message = "Job not found" });
            }
            var user = await _unitOfWork.IndividualUsers.GetByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { Message="User not found" });
            }
            var existingApplication = await _unitOfWork.JobApplications
           .GetByIdAsync(job.Id, userId);

            if (existingApplication != null)
            {
                return BadRequest("You have already applied for this job");
            }
            var questionsAnswersJson = model.QuestionsAnswers;
            Dictionary<int, string> questionsAnswers;

            // Check if the string is already JSON encoded
            if (!string.IsNullOrEmpty(questionsAnswersJson) && questionsAnswersJson.StartsWith("{") && questionsAnswersJson.EndsWith("}"))
            {
                // Directly use the JSON string without deserialization
                 questionsAnswers = JsonConvert.DeserializeObject<Dictionary<int, string>>(questionsAnswersJson);
            }
            else
            {
                // Deserialize the string to a dictionary
                 questionsAnswers = JsonConvert.DeserializeObject<Dictionary<int, string>>(questionsAnswersJson);
            }
            // Save the CV file
            if (model.CV != null)
            {
                if (model.CV.Length > FileSettings.MAxFileSizeInBytes)
                {
                    return BadRequest(new { message = "File size should not be more than 5MB!" });
                }
                if (!FileSettings.AllowedCVExtensions.Contains(Path.GetExtension(model.CV.FileName).ToLower()))
                {
                    return BadRequest(new { message = "This file extension is not allowed!" });
                }

                string fileName = "cv-" + Guid.NewGuid().ToString() + Path.GetExtension(model.CV.FileName);

                // Delete the old cv if it exists
                if (!string.IsNullOrEmpty(user.CVURL))
                {
                    bool deleted = await _uploadFilesToCloud.DeleteFile(user.CVURL);
                    if (!deleted)
                    {
                        return BadRequest(new { message = "Failed to delete the old CV!" });
                    }
                }

                string cvUrl = await _uploadFilesToCloud.UploadFile(model.CV, fileName);

                if (cvUrl == String.Empty)
                {
                    return BadRequest(new { message = "Failed to upload the CV!" });
                }
                // Update the user's CV URL
                user.CVURL = cvUrl;
                // Update the job application with the CV URL
                model.CVURL = cvUrl;
            }

            // Create a new JobApplication
            var jobApplication = new JobApplication
            {
                JobId = model.JobId,
                UserId = userId,
                Status = ApplicationStatus.Pending,
                IsApproved = false,
                Gender = model.Gender.Trim('"', ' '),
                FullName = model.FullName.Trim('"', ' '),
                Email = model.Email.Trim('"', ' '),
                CVURL = model.CVURL.Trim('"', ' '),
                Phone = model.Phone.Trim('"', ' '),
                UserAnswers = questionsAnswers?.Select(qa => new UserJobAnswer
                {
                    QuestionId = qa.Key,
                    Answer = qa.Value,
                    UserId = userId,
                    JobId = model.JobId
                }).ToList()
            };

            // Add the JobApplication to the database
            await _unitOfWork.JobApplications.AddAsync(jobApplication);
            await _unitOfWork.SaveAsync();

            // Call the model to get the score
            var score = 0; // Default score
            if (!string.IsNullOrEmpty(jobApplication.CVURL))
            {
                score = await CallModelToGetScore(jobApplication);
            }
            // Update the application status based on the score
            jobApplication.IsApproved = score >= 50;
            await _unitOfWork.SaveAsync();
            if (jobApplication.IsApproved)
            {
                return Ok("Application submitted");
            }
            else
            {
                return Ok("Application submitted");
            }
        }

        //delete job application by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobApplication(int id)
        {
            var jobApplication = await _unitOfWork.JobApplications.GetByIdAsync(id);
            if (jobApplication == null)
            {
                return NotFound();
            }
            await _unitOfWork.JobApplications.DeleteByIdAsync(jobApplication.JobId,jobApplication.UserId);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

        #region CV model
        [HttpPost("predict")]
        public IActionResult Predict([FromBody] CVDataModel data)
        {
            try
            {
                // Here you can perform your model prediction logic
                // For demonstration purposes, let's assume we return a random score between 0 and 100
                var random = new Random();
                var score = random.Next(0, 101);

                return Ok(score); // Return the score as JSON response
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        public class CVDataModel
        {
            public byte[] CVData { get; set; }
        }
        private async Task<int> CallModelToGetScore(JobApplication jobApplication)
        {
            try
            {
                var cvData = await GetCVData(jobApplication.CVURL);
                var requestData = JsonConvert.SerializeObject(new { CVData = cvData });
                var modelEndpoint = "https://your-model-endpoint.com/predict";

                using (var httpClient = new HttpClient())
                {
                    var requestContent = new StringContent(requestData, Encoding.UTF8, "application/json");
                    var response = await httpClient.PostAsync(modelEndpoint, requestContent);
                    response.EnsureSuccessStatusCode();
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var score = JsonConvert.DeserializeObject<int>(responseBody);
                    return score;
                }
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error calling model: " + ex.Message);
                return 0; // Return 0 or another default value in case of error
            }
        }

        private async Task<byte[]> GetCVData(string cvUrl)
        {
            try
            {
                using (var httpClient = new HttpClient())
                {
                    var response = await httpClient.GetAsync(cvUrl);
                    response.EnsureSuccessStatusCode();
                    var cvData = await response.Content.ReadAsByteArrayAsync();
                    return cvData;
                }
            }
            catch (HttpRequestException ex)
            {
                Console.Error.WriteLine("HTTP request error: " + ex.Message);
                throw new HttpRequestException("Error fetching CV data: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Error fetching CV data: " + ex.Message);
                throw;
            }
        }
       
        #endregion

        [HttpPost("UploadCV")]
        public async Task<IActionResult> UploadCV(IFormFile file)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (file != null && userId != null)
            {
                var user = await _unitOfWork.IndividualUsers.GetByIdAsync(userId);
                if (user != null)
                {
                    if (file.Length > FileSettings.MAxFileSizeInBytes)
                    {
                        return BadRequest(new { message = "File size should not be more than 5MB!" });
                    }
                    if (!FileSettings.AllowedCVExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
                    {
                        return BadRequest(new { message = "This file extension is not allowed!" });
                    }

                    string fileName = "cv-"+ Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // Delete the old cv if it exists
                    if (!string.IsNullOrEmpty(user.CVURL))
                    {
                        bool deleted = await _uploadFilesToCloud.DeleteFile(user.CVURL);
                        if (!deleted)
                        {
                            return BadRequest(new { message = "Failed to delete the old CV!" });
                        }
                    }

                    string cvUrl = await _uploadFilesToCloud.UploadFile(file, fileName);

                    if (cvUrl == String.Empty)
                    {
                        return BadRequest(new { message = "Failed to upload the CV!" });
                    }
                    // Update the user's CV URL
                    user.CVURL = cvUrl;
                    await _unitOfWork.SaveAsync();

                    return Ok(user.CVURL); // Return the URL of the updated CV
                }
            }
            return BadRequest("No file or user found.");
        }

        [HttpGet("GetUserJobs")]
        public async Task<ActionResult<IEnumerable<GetAppliedJobsDTO>>> GetUserJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var jobs = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            if (jobs == null)
            {
                return NotFound("No jobs found");
            }
           // var jobsDTO = _mapper.Map<IEnumerable<JobDTO>>(jobs);
           // var jobApp =await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            var res =await _unitOfWork.JobApplications.GetAppliedJobsAsync(userId);

            return Ok(res);
        }

        // view all applications for a job
        [HttpGet("Applications/{jobId}")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplications(int jobId)
        {
            var job = await _unitOfWork.Jobs.GetByIdAsync(jobId);
            if (job == null)
            {
                return NotFound("Job not found");
            }

            var applications = await _unitOfWork.JobApplications.GetAllAsync(j => j.JobId == jobId);
            return Ok(applications);
        }
        // view one application for a job
        [HttpGet("Application/{jobId}/{userId}")]
        public async Task<ActionResult<JobApplication>> GetJobApplication(int jobId, string userId)
        {
            var application = await _unitOfWork.JobApplications.GetApplicationByIdAsync(jobId, userId);
            if (application == null)
            {
                return NotFound("Job application not found");
            }
            return Ok(application);
        }
        // view all applications for a user
        [HttpGet("UserApplications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUserApplications()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var applications = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            return Ok(applications);
        }
        [Authorize(Roles = SD.ROLE_COMPANY)] // Add authorization if required
        [HttpPatch("approve/job/{jobId}/user/{userId}")]
        public async Task<IActionResult> ApproveJobApplication(int jobId, string userId)
        {
            var jobApplication = await _unitOfWork.JobApplications.GetApplicationByIdAsync(jobId,userId);

            if (jobApplication == null)
            {
                return NotFound(new { message = "Job application not found" });
            }

            jobApplication.IsApproved = true; // Update approval status

            _unitOfWork.JobApplications.Update(jobApplication);
            await _unitOfWork.SaveAsync();

            return Ok("Job application approved successfully");
        }
        [Authorize(Roles = SD.ROLE_COMPANY)]
        [HttpPatch("reject/job/{jobId}/user/{userId}")]
        public async Task<IActionResult> RejectJobApplication(int jobId, string userId)
        {
            var jobApplication = await _unitOfWork.JobApplications.GetApplicationByIdAsync(jobId, userId);

            if (jobApplication == null)
            {
                return NotFound(new { message = "Job application not found" });
            }

            jobApplication.IsApproved = false; // Update approval status

            _unitOfWork.JobApplications.Update(jobApplication);
            await _unitOfWork.SaveAsync();

            return Ok("Job application rejected successfully");
        }
        // send email for interview to all job applicants for a job
        [Authorize(Roles = SD.ROLE_COMPANY)]
        [HttpPost("interview/job/{jobId}")]
        public async Task<IActionResult> SendInterviewEmail(int jobId, [FromBody] InterviewEmailDTO interview)
        {
            var job = await _unitOfWork.Jobs.GetByIdAsync(jobId);
            if (job == null)
            {
                return NotFound("Job not found");
            }
            var jobApplications = await _unitOfWork.JobApplications.GetAllAsync(j => j.JobId == jobId && j.IsApproved);
            if (jobApplications == null || !jobApplications.Any())
            {
                return NotFound("No job applications found");
            }
            interview.InterviewLink = "https://localhost:7049/InterviewMock/"+ job.MockId;
            foreach (var application in jobApplications)
            {
                var user = await _unitOfWork.IndividualUsers.GetByIdAsync(application.UserId);
                if (user != null)
                {
                    var email = application.Email.Trim('"');
                    var subject = "Interview Invitation";
                    var body = "You have been approved for the job: " + job.Title + ".the link to interview is  "+interview.InterviewLink;

                    var emailDto = new EmailDTO
                    {
                        To = email,
                        Subject = subject,
                        Body = body
                    };

                  _emailSender.SendEmailAsync(emailDto);
                }
            }

            return Ok(new {Message =  "Interview emails sent successfully"});
        }
    }
}
