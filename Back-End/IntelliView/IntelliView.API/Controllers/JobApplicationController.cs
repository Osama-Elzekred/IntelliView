﻿using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
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
            // Deserialize the questionsAnswers string to a dictionary
            var questionsAnswers = JsonConvert.DeserializeObject<Dictionary<int, string>>(model.QuestionsAnswers);

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
                string webRootPath = _webHostEnvironment.ContentRootPath;
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(model.CV.FileName);
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
                    await model.CV.CopyToAsync(fileStream);
                }

                // Update the job application with the CV URL
                model.CVURL = Path.Combine("wwwroot", "Assets", "CVs", fileName).Replace("\\", "/");
                user.CVURL = model.CVURL;
            }

            // Create a new JobApplication
            var jobApplication = new JobApplication
            {
                JobId = model.JobId,
                UserId = userId,
                Status = ApplicationStatus.Pending,
                IsApproved = false,
                Gender = model.Gender,
                FullName = model.FullName,
                Email = model.Email,
                Phone = model.Phone,
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
                    if (file.Length > FileSettings.MAxFileSizeInBytes)
                    {
                        return BadRequest(new { message = "File size should not be more than 5MB!" });
                    }
                    if (!FileSettings.AllowedCVExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
                    {
                        return BadRequest(new { message = "This file extension is not allowed!" });
                    }
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
    }
}
