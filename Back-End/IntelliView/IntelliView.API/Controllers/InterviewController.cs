using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/interview")]
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
        [HttpPost("startMock/{id}")]
        public async Task<IActionResult> StartInterviewMock(int id)
        {

            var sessionId = await _interviewService.StartInterviewMock(id);
            if (sessionId == null)
            {
                return BadRequest(new { message = "Interview Mock not found" });
            }
            var initialQuestion = _interviewService.GetMockNextQuestion(sessionId);

            if (initialQuestion == null)
            {

                return BadRequest(new { message = "No available questions found for this interview" });
            }

            return Ok(new { SessionId = sessionId, Question = initialQuestion });
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
