using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
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
        [HttpPost("start")]
        public IActionResult StartInterview()
        {
            var sessionId = _interviewService.StartInterview();
            var initialQuestion = _interviewService.GetNextQuestion(sessionId);

            return Ok(new { SessionId = sessionId, Question = initialQuestion });
        }
        [HttpGet("question/{sessionId}")]
        public IActionResult GetNextQuestion([FromBody] string sessionId)
        {
            var nextQuestion = _interviewService.GetNextQuestion(sessionId);
            return Ok(new { nextQuestion });
        }
        [HttpPost("answer")]
        public IActionResult SubmitAnswer([FromBody] InterviewAnswerDto answerDto)
        {
            var nextQuestion = _interviewService.ProcessAnswer(answerDto);
            return Ok(new { Question = nextQuestion });
        }
    }
}
