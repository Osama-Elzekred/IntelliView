﻿using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
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
        private readonly IInterviewService _interviewService;
        public InterviewMockController(IUnitOfWork unitOfWork, IMapper mapper, IInterviewService interviewService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _interviewService = interviewService;
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
            interviewMock.Language = interviewMockDto.MockLanguage;

            await _unitOfWork.InterviewMocks.AddAsync(interviewMock);
            await _unitOfWork.SaveAsync();
            _ = Task.Run(() => _interviewService.AddInterviewVideos(interviewMock));
            return Ok();
        }
        [HttpGet("GetInterviewMocks/{id}")]
        public async Task<ActionResult<IEnumerable<DisplayInterviewMockDto>>> GetInterviewMocks(int id)
        {

            var interviewMocks = await _unitOfWork.InterviewMocks.GetAllAsync(i => i.InterviewTopicId == id);
            var interviewMocksDto = _mapper.Map<IEnumerable<DisplayInterviewMockDto>>(interviewMocks);
            return Ok(interviewMocksDto);
        }
        //all mocks 
        [HttpGet("GetInterviewMocks")]
        public async Task<ActionResult<IEnumerable<DisplayInterviewMockDto>>> GetInterviewMocks()
        {
            var interviewMocks = await _unitOfWork.InterviewMocks.GetAllAsync();
            var interviewMocksDto = _mapper.Map<IEnumerable<DisplayInterviewMockDto>>(interviewMocks);
            return Ok(interviewMocksDto);
        }

        //delete interview mock 
        [HttpDelete("DeleteInterviewMock/{id}")]
        public async Task<ActionResult> DeleteInterviewMock(int id)
        {
            var interviewMock = await _unitOfWork.InterviewMocks.GetByIdAsync(id);
            if (interviewMock == null)
            {
                return NotFound();
            }
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.MockId == id);
            if (job != null)
            {
                job.MockId = null;
            }
            await _unitOfWork.InterviewMocks.DeleteByIdAsync(interviewMock.Id);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
        // delete interview topic
        [HttpDelete("DeleteInterviewTopic/{id}")]
        public async Task<ActionResult> DeleteInterviewTopic(int id)
        {
            var interviewTopic = await _unitOfWork.InterviewMockTopics.GetByIdAsync(id);
            if (interviewTopic == null)
            {
                return NotFound();
            }
            await _unitOfWork.InterviewMockTopics.DeleteByIdAsync(interviewTopic.Id);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
        //update interview mock
        [HttpPut("UpdateInterviewMock/{id}")]
        public async Task<ActionResult> UpdateInterviewMock(int id, AddInterviewMockDTO interviewMockDto)
        {
            var interviewMock = await _unitOfWork.InterviewMocks.GetByIdAsync(id);
            if (interviewMock == null)
            {
                return NotFound();
            }
            _mapper.Map(interviewMockDto, interviewMock);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }



    }
}
