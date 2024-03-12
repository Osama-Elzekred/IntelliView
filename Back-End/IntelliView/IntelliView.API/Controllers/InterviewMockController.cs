using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.DTO.Interview;
using IntelliView.Models.Models;
using Microsoft.AspNetCore.Mvc;

namespace IntelliView.API.Controllers
{
    [Route("api/InterviewMock")]
    [ApiController]
    public class InterviewMockController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InterviewMockController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }
        [HttpGet("allInterviewTopics")]
        public async Task<ActionResult<IEnumerable<InterviewMockTopic>>> GetallInterviewTopics()
        {
            var interviewTopics = await _unitOfWork.InterviewMockTopics.GetAllAsync();
            return Ok(interviewTopics);
        }
        [HttpPost("AddInterviewTopic")]
        public async Task<ActionResult<InterviewMockTopic>> AddInterviewTopic(AddInterviewTopicDTO interviewTopicDto)
        {
            if (interviewTopicDto == null)
            {
                return BadRequest("The interview topic data must not be null");
            }

            var interviewTopic = _mapper.Map<InterviewMockTopic>(interviewTopicDto);

            await _unitOfWork.InterviewMockTopics.AddAsync(interviewTopic);
            await _unitOfWork.SaveAsync();

            return Ok("Added successfully");
        }

        [HttpPost("AddInterviewMock")]
        public async Task<ActionResult<InterviewMock>> AddInterviewMock(AddInterviewMockDTO interviewMockDto)
        {
            var interviewMock = _mapper.Map<InterviewMock>(interviewMockDto);

            await _unitOfWork.InterviewMocks.AddAsync(interviewMock);
            await _unitOfWork.SaveAsync();

            return Ok();
        }
        [HttpGet("GetInterviewMocks/{id}")]
        public async Task<ActionResult<IEnumerable<DisplayInterviewMockDto>>> GetInterviewMocks(int id)
        {

            var interviewMocks = await _unitOfWork.InterviewMocks.GetAllAsync(i => i.InterviewTopicId == id);
            var interviewMocksDto = _mapper.Map<IEnumerable<DisplayInterviewMockDto>>(interviewMocks);
            return Ok(interviewMocksDto);
        }

    }
}
