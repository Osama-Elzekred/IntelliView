using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = SD.ROLE_USER)]
    public class JobApplicationController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public readonly IWebHostEnvironment _webHostEnvironment;
        public JobApplicationController(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
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

        [HttpPost("apply")]
        public async Task<IActionResult> ApplyForJob([FromBody] JobApplicationDTO applicationDto)
        {
            // Validate DTO and perform necessary checks
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var job = await _unitOfWork.Jobs.GetByIdAsync(applicationDto.JobId);
            if (job == null)
            {
                return NotFound("Job not found");
            }

            // You may want to check if the user is authorized to apply for this job
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // Assuming you have authentication set up
            if (userId == null)
            {
                return Unauthorized();
            }
            var existingApplication = await _unitOfWork.JobApplications
                .GetByIdAsync(job.Id, userId);

            if (existingApplication != null)
            {
                return BadRequest("You have already applied for this job");
            }

            // Create a new user application
            var userApplication = new JobApplication
            {
                JobId = job.Id,
                UserId = userId,
                UserAnswers = new List<UserJobAnswer>(),
                ResumeURL = applicationDto.ResumeURL,
                // Add other properties as needed
            };

            // Populate user answers based on the provided DTO
            foreach (var answerDto in applicationDto.UserAnswers)
            {
                var userAnswer = new UserJobAnswer
                {
                    QuestionId = answerDto.QuestionId,
                    Answer = answerDto.Answer,
                };

                userApplication.UserAnswers.Add(userAnswer);
            }

            // Save user application to the database
            await _unitOfWork.JobApplications.AddAsync(userApplication);
            await _unitOfWork.SaveAsync();

            return Ok("Application submitted successfully");
        }
        [HttpPost("UploadCV")]
        public async Task<IActionResult> UploadCV(IFormFile file)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (file != null && userId != null)
            {
                var user = await _unitOfWork.IndividualUsers.GetByIdAsync(userId);
                if (user != null)
                {
                    string webRootPath = _webHostEnvironment.ContentRootPath;
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    string CVPath = Path.Combine(webRootPath, "wwwroot", "Assets", "CVs", fileName);

                    // Delete the old cv if it exists
                    if (!string.IsNullOrEmpty(user.CVURL))
                    {
                        var oldCVPath = Path.Combine(webRootPath, user.CVURL.TrimStart('\\'));
                        if (System.IO.File.Exists(oldCVPath))
                        {
                            System.IO.File.Delete(oldCVPath);
                        }
                    }

                    using (var fileStream = new FileStream(CVPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }

                    // Update the user's CV URL
                    user.CVURL = Path.Combine("wwwroot", "Assets", "CVs", fileName).Replace("\\", "/");
                    await _unitOfWork.SaveAsync();

                    return Ok(user.CVURL); // Return the URL of the updated CV
                }
            }
            return BadRequest("No file or user found.");
        }

        [HttpGet("GetUserJobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetUserJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            return Ok(jobs);
        }
        // view all applications for a job
        [HttpGet("JobApplications/{jobId}")]
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
        // view all applications for a user
        [HttpGet("UserApplications")]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetUserApplications()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var applications = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            return Ok(applications);
        }

    }
}
