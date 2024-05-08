using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Models.Models.job;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(policy: "UserOrCompany")]
    public class JobController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IInterviewService _interviewService;
        public JobController(IUnitOfWork unitOfWork, IMapper mapper, IInterviewService interviewService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _interviewService = interviewService;

        }

        //get company details by companyid
        [HttpGet("CompanyDetails/{companyId}")]
        public async Task<ActionResult<ProfileDTO>> GetCompanyDetails(string companyId)
        {

            if (string.IsNullOrEmpty(companyId))
            {
                return BadRequest(new { message = "Company ID is required" });
            }
            var company = await _unitOfWork.CompanyUsers.GetByIdAsync(companyId);
            if (company == null)
            {
                return NotFound(new { message = "Company not found" });
            }
            return Ok(company);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<JobDTO>>> GetAllJobs()
        {
            var jobs = await _unitOfWork.Jobs.GetAllAsyncWithTopics();
            var jobsDto = _mapper.Map<IEnumerable<JobDTO>>(jobs);
            return Ok(jobsDto);
        }

        [Authorize(Roles = SD.ROLE_USER)]
        [HttpGet("questions/{jobId}")]
        public async Task<ActionResult<IEnumerable<(int, string)>>> GetJobQuestions(int jobId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == jobId);

            if (job == null)
            {
                return NotFound();
            }

            var jobQuestions = await _unitOfWork.JobQuestions.GetJobQuestionsAsync(jobId);

            if (jobQuestions == null)
            {
                return NotFound();
            }
            return Ok(jobQuestions);
        }


        [HttpGet("AllTopics")]
        public async Task<ActionResult<IEnumerable<InterestedTopic>>> GetAllTopics()
        {
            var topics = await _unitOfWork.InterestedTopics.GetAllAsync();
            return Ok(topics);
        }

        //[HttpPost("AddInterested")]
        //public async Task<ActionResult<JobInterestedTopic>> AddInterestedTopic(int JobId, InterestedTopicDTO interestedTopicDto)
        //{
        //    // Validate interestedTopicDto...
        //    interestedTopicDto.JobId = JobId;
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    var Mock = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == interestedTopicDto.JobId && j.CompanyUserId == userId);
        //    if (Mock == null)
        //    {
        //        return NotFound();
        //    }
        //    var interestedTopic = new JobInterestedTopic
        //    {
        //        InterestedTopicId = interestedTopicDto.InterestedTopicId,
        //        JobId = interestedTopicDto.JobId
        //    };
        //    await _unitOfWork.JobInterestedTopic.AddAsync(interestedTopic);
        //    await _unitOfWork.SaveAsync();
        //    return CreatedAtAction(nameof(GetJobInterestedTopics), new { interestedTopicDto.JobId }, interestedTopic);
        //}

        [HttpGet("GetJobsByRange")]
        public IActionResult Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string filter = "")
        {
            var query = _unitOfWork.Jobs.GetAsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                query = query.Where(job => job.Title.ToLower().Contains(filter.ToLower()) || job.Description.ToLower().Contains(filter.ToLower()));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            //query = Convert.ToString(query.Skip((page - 1) * pageSize).Take(pageSize));

            var result = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                Jobs = query.Skip((page - 1) * pageSize).Take(pageSize).ToList()
            };

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobDTO>> GetJobById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id);

            if (job == null)
            {
                return NotFound();
            }
            var JobDto = _mapper.Map<JobDTO>(job);
            var company = await _unitOfWork.CompanyUsers.GetFirstOrDefaultAsync(c => c.Id == job.CompanyUserId);
            if (company == null)
            {
                return NotFound("Company not found");
            }
            JobDto.ImageURl = company.ImageURl;
            JobDto.companyName = company.CompanyName;
            JobDto.CompanyUserId = company.Id;
            return Ok(JobDto);
        }
        // delete Mock question by id
        [HttpDelete("DeleteJobQuestion/{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<JobQuestion>> DeleteByIdAsync(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobQuestion = await _unitOfWork.JobQuestions.GetFirstOrDefaultAsync(j => j.Id == id, j => j.Job);
            if (jobQuestion == null)
            {
                return NotFound();
            }
            if (jobQuestion.Job.CompanyUserId != userId)
            {
                return Unauthorized();
            }
            await _unitOfWork.JobQuestions.RemoveQuestionFromJob(jobQuestion.JobId, jobQuestion.Id);
            await _unitOfWork.SaveAsync();
            return jobQuestion;
        }

        #region Company

        [HttpGet("CompanyJob/{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<AddJobDto>> GetCompanyJob(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId, properties: [j => j.JobInterestedTopic, j => j.JobQuestions]);

            if (job == null)
            {
                return NotFound();
            }
            var jobDto = _mapper.Map<AddJobDto>(job);
            jobDto.JobInterestedTopics = job.JobInterestedTopic?.Select(topic => new JobInterestedTopicDto
            {
                InterestedTopicId = topic.InterestedTopicId,
                Topic = topic.InterestedTopic.Topic
            }).ToList();
            jobDto.CustQuestions = job.JobQuestions?.Select(q => new CustQuestionDto
            {
                Id = q.JobId,
                Question = q.Question
            }
            ).ToList();
            // return null for now 
            jobDto.QuestionItems = job.InterviewMock?.InterviewQuestions?.Select(q => new QuestionItemDto
            {
                Id = q.Id,
                Question = q.Question,
                Answer = q.ModelAnswer,

            }).ToList();

            return Ok(jobDto);
        }

        [HttpGet("CompanyJobs")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<IEnumerable<Job>>> GetCompanyJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.Jobs.GetAllAsync(j => j.CompanyUserId == userId);
            return Ok(jobs);
        }
        [HttpPost]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<JsonContent>> CreateJob([FromBody] AddJobDto jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            jobDto.CompanyUserId = userId;
            var company = await _unitOfWork.CompanyUsers.GetFirstOrDefaultAsync(c => c.Id == userId);
            if (company == null)
            {
                return NotFound("Company not found");
            }
            jobDto.ImageURl = company.ImageURl;
            var job = _mapper.Map<Job>(jobDto);
            job.ImageURl = company.ImageURl;
            job.JobInterestedTopic = jobDto.JobInterestedTopics?.Select(topic => new JobInterestedTopic
            {
                //InterestedTopicId = topic.InterestedTopicId,
                //JobId = Mock.Id
                InterestedTopic = new InterestedTopic
                {
                    Topic = topic.Topic
                }
            }).ToList();


            job.JobQuestions = jobDto.CustQuestions?.Select(q => new CustQuestion
            {
                Question = q.Question,
                JobId = job.Id
            }).ToList();

            job.InterviewMock = new InterviewMock
            {
                InterviewQuestions = jobDto.QuestionItems != null ? jobDto.QuestionItems.Select(q => new InterviewQuestion
                {
                    Question = q.Question,
                    ModelAnswer = q.Answer,
                }).ToList() : new List<InterviewQuestion>(),
                Title = jobDto.Title,
                Description = jobDto.Description,
                Level = InterviewLevel.None
            };


            await _unitOfWork.Jobs.AddAsync(job);
            await _unitOfWork.SaveAsync();
            Task.Run(() => _interviewService.AddInterviewVideos(job.InterviewMock));

            return Ok(new { id = job.Id });
        }
        //[HttpPut("{id}")]
        //[Authorize(Roles = SD.ROLE_COMPANY)]
        //public async Task<IActionResult> UpdateJob(int id, UpdateJobDTO jobDto)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        //    // Retrieve the existing Mock
        //    var existingJob = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);

        //    if (existingJob == null)
        //    {
        //        return NotFound("Job not found or you do not have permission to update it");
        //    }

        //    // Update the existing Mock with the new information
        //    //var Mock = _mapper.Map<Job>(jobDto);
        //    _mapper.Map(jobDto, existingJob);
        //    // Update other properties as needed

        //    // Save changes to the database
        //    await _unitOfWork.Jobs.Update(existingJob);
        //    await _unitOfWork.SaveAsync();

        //    return NoContent();
        //}

        [HttpPut("{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<IActionResult> UpdateJob(int id, [FromBody] AddJobDto jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);

            if (job == null)
            {
                return NotFound();
            }

            // Map jobDto to Mock
            _mapper.Map(jobDto, job);

            // Update the Mock
            await _unitOfWork.Jobs.Update(job);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);

            if (job == null)
            {
                return NotFound();
            }

            await _unitOfWork.Jobs.RemoveAsync(job);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }
        #region NotTested
        // get all Mock applications for a Mock
        [HttpGet("{jobId}/applications")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetJobApplications(int jobId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == jobId && j.CompanyUserId == userId);
            if (job == null)
            {
                return NotFound("Invalid job ");
            }
            var jobApplications = await _unitOfWork.JobApplications.GetApplicationsByJobIdAsync(jobId);
            return Ok(jobApplications);
        }
        // allow company to view a specific Mock application
        [HttpGet("{jobId}/applications/{applicationId}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<JobApplicationDto>> GetJobApplication(int jobId, string userId)
        {
            var CompanyUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == jobId && j.CompanyUserId == CompanyUserId);
            if (job == null)
            {
                return NotFound("Invalid job ");
            }
            var jobApplication = await _unitOfWork.JobApplications.GetApplicationByIdAsync(jobId, userId);

            if (jobApplication == null)
            {
                return NotFound(new { message = "Job application not found" });
            }
            return Ok(jobApplication);
        }
        //allow company to Reject a Mock application
        [HttpPut("{jobId}/applications/{applicationId}/Reject")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<IActionResult> RejectJobApplication(int jobId, int applicationId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == jobId && j.CompanyUserId == userId);
            if (job == null)
            {
                return NotFound("Invalid job ");
            }
            var jobApplication = await _unitOfWork.JobApplications.GetByIdAsync(applicationId, jobId);
            if (jobApplication == null)
            {
                return NotFound("Invalid application ");
            }
            jobApplication.Status = ApplicationStatus.Rejected;
            _unitOfWork.JobApplications.Update(jobApplication);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }

        #endregion

        #endregion
    }
}
