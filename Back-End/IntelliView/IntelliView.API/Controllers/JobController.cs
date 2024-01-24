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
    [Authorize(policy: "UserOrCompany")]
    public class JobController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public JobController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Job>>> GetAllJobs()
        {
            var jobs = await _unitOfWork.Jobs.GetAllAsync();
            return Ok(jobs);
        }
        [HttpPost("questions")]
        public async Task<ActionResult<JobQuestion>> AddQuestion(int JobId, QuestionDTO questionDto)
        {
            // Validate questionDto...
            questionDto.JobId = JobId;
            QuestionType type = questionDto.Type.ToLower() switch
            {
                "Text" => QuestionType.Text,
                "MCQ" => QuestionType.MCQ,
                "TrueFalse" => QuestionType.TrueFalse,
                _ => QuestionType.Text
            };
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == questionDto.JobId && j.CompanyUserId == userId);

            if (job == null)
            {
                return NotFound();
            }

            var jobquestion = new JobQuestion();

            if (type == QuestionType.Text)
            {
                jobquestion = new JobQuestion
                {
                    Content = questionDto.Content,
                    Type = QuestionType.Text,
                    JobId = questionDto.JobId
                };
            }
            else if (type == QuestionType.MCQ)
            {

                jobquestion = new JobQuestion
                {
                    Content = questionDto.Content,
                    Type = QuestionType.MCQ,
                    JobId = questionDto.JobId
                };
                questionDto.MCQOptions.ForEach(option =>
                {
                    jobquestion.MCQOptions.Add(new MCQOption
                    {
                        Content = option.ToString()
                    });
                });
            }
            else if (type == QuestionType.TrueFalse)
            {
                jobquestion = new JobQuestion
                {
                    Content = questionDto.Content,
                    Type = QuestionType.TrueFalse,
                    JobId = questionDto.JobId
                };
            }
            else
            {
                return BadRequest("Invalid question type");
            }
            await _unitOfWork.JobQuestions.AddAsync(jobquestion);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetJobQuestions), new { questionDto.JobId }, jobquestion);
        }
        [HttpGet("{jobId}/questions")]
        public async Task<ActionResult<IEnumerable<JobQuestion>>> GetJobQuestions(int jobId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == jobId && j.CompanyUserId == userId);
            if (job == null)
            {
                return NotFound();
            }
            var jobquestions = await _unitOfWork.JobQuestions.GetAllAsync(j => j.JobId == jobId);
            return Ok(jobquestions);
        }

        #region Company
        [HttpGet("{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<Job>> GetJobById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);

            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }
        [HttpGet("GetCompanyJobs")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<IEnumerable<Job>>> GetCompanyJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.Jobs.GetAllAsync(j => j.CompanyUserId == userId);
            return Ok(jobs);
        }
        [HttpPost]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<Job>> CreateJob(AddJobDTO jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            jobDto.CompanyUserId = userId;

            var job = _mapper.Map<Job>(jobDto);
            await _unitOfWork.Jobs.AddAsync(job);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, job);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<IActionResult> UpdateJob(int id, AddJobDTO jobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (id != jobDto.Id || userId != jobDto.CompanyUserId)
            {
                return BadRequest("Invalid request");
            }

            var job = _mapper.Map<Job>(jobDto);
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
        #endregion
    }
}
