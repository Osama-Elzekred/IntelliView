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
        public JobApplicationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
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



        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Job>>> GetAllJobs()
        {
            var jobs = await _unitOfWork.Jobs.GetAllAsync();
            return Ok(jobs);
        }
        //[HttpPost("Apply")]
        //public async Task<IActionResult> ApplyJob(ApplyJobDTO applyJobDto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    applyJobDto.IndividualUserId = userId;
        //    var applyJob = _mapper.Map<ApplyJob>(applyJobDto);
        //    await _unitOfWork.ApplyJobs.AddAsync(applyJob);
        //    await _unitOfWork.SaveAsync();
        //    return CreatedAtAction(nameof(GetJobById), new { id = applyJob.Id }, applyJob);
        //}
        // POST: api/job-applications/apply
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




        [HttpGet("GetUserJobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetUserJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == userId);
            return Ok(jobs);
        }
    }
}
