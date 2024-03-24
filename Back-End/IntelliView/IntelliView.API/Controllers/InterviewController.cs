using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.DTO.Interview;
using IntelliView.Models.Models;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/Interview")]
    [ApiController]
    public class InterviewController : ControllerBase
    {
        private readonly IInterviewService _interviewService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public InterviewController(IInterviewService interviewService, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _interviewService = interviewService;
        }
        [HttpGet("Mock/{id}")]
        public async Task<IActionResult> StartInterviewMock(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                //return Unauthorized();
            }
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(m => m.Id == id, properties: m => m.InterviewQuestions);
            if (mock is null)
            {
                return NotFound("Mock not found");
            }

            JobApplication? jobApplication = null;
            // for jobs 
            if (mock.JobId is not null)
            {
                jobApplication = await _unitOfWork.JobApplications.GetByIdAsync(mock.JobId, userId);
            }
            var questions = _mapper.Map<List<InterviewSessionQuestionsDto>>(mock.InterviewQuestions);


            return Ok(new InterviewSessionDto()
            {
                Questions = questions ?? new List<InterviewSessionQuestionsDto>(),
                Title = mock.Title,
                JobId = mock.JobId,
                Authorized = true ? jobApplication is not null || mock.JobId is null : false,
            });
        }

        [HttpGet("question/{sessionId}")]
        public IActionResult GetNextQuestion([FromBody] string sessionId)
        {
            var nextQuestion = _interviewService.GetMockNextQuestion(sessionId);
            return Ok(new { nextQuestion });
        }
        [HttpPost("answer")]
        public IActionResult SubmitAnswer([FromBody] InterviewAnswerDto answerDto)
        {
            var nextQuestion = _interviewService.ProcessAnswer(answerDto);
            return Ok(new { Question = nextQuestion });
        }
        [HttpGet("getMock")]
        public async Task<ActionResult<InterviewMock>> getMock(int id)
        {
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(x => x.Id == id, properties: m => m.InterviewQuestions);
            if (mock == null)
                return NotFound();
            return Ok(new
            {
                Questions = mock.InterviewQuestions?.Select(m => new { m.Id, m.Question, m.VideoId, m.Url }),
                mock.Id,
                mock.Title,
                mock.Description
            });
        }

        // start interview mock , return session id , and first question Dto

    }
}
