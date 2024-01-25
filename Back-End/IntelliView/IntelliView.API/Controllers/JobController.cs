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
        [HttpPost("AddQuestions")]
        public async Task<ActionResult<JobQuestion>> AddQuestion(int JobId, QuestionDTO questionDto)
        {
            // Validate questionDto...
            questionDto.JobId = JobId;
            QuestionType type = questionDto.Type.ToLower() switch
            {
                "text" => QuestionType.Text,
                "mcq" => QuestionType.MCQ,
                "truefalse" => QuestionType.TrueFalse,
                _ => QuestionType.Text
            };
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == questionDto.JobId && j.CompanyUserId == userId);

            if (job == null)
            {
                return NotFound();
            }

            var jobquestion = new JobQuestion
            {
                Content = questionDto.Content,
                JobId = questionDto.JobId
            };

            if (type == QuestionType.Text)
                jobquestion.Type = QuestionType.Text;
            else if (type == QuestionType.MCQ)
            {

                jobquestion.Type = QuestionType.MCQ;
                jobquestion.MCQOptions = new List<MCQOption>();
                questionDto.MCQOptions?.ForEach(option =>
                {
                    jobquestion.MCQOptions.Add(new MCQOption
                    {
                        QuestionId = jobquestion.Id,
                        Content = option.ToString()
                    });
                });
            }
            else if (type == QuestionType.TrueFalse)
                jobquestion.Type = QuestionType.TrueFalse;
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
            var jobQuestions = await _unitOfWork.JobQuestions.GetJobQuestionsAsync(jobId);
            var jq = jobQuestions.Select(jq => new { jq.Id, jq.Content, jq.Type, jq.MCQOptions });
            return Ok(jq);
        }

        [HttpGet]
        public IActionResult Get([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string filter = "")
        {
            var query = _unitOfWork.Jobs.GetAsQueryable();

            if (!string.IsNullOrEmpty(filter))
            {
                //query = query.Where(article => article.Title.Contains(filter) || article.Category.Contains(filter));
            }

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            var result = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize,
                Articles = query.ToList()
            };

            return Ok(result);
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
