using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{

    [Route("api/MockSession")]
    [ApiController]
    //[Authorize(policy: "UserOrCompany")]
    public class MockSessionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MockSessionController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("/UserMockSession/{id}")]
        public async Task<ActionResult<UserMockSessionDTO>> UserMockSession(int id)
        {

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            //if (userId == null)
            //{
            //    return Unauthorized();
            //}

            var UserMockSession = await _unitOfWork.UserMockSessions.GetUserMockSessionAsync(id);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            var userMockSessionDTO = _mapper.Map<UserMockSessionDTO>(UserMockSession);
            return Ok(userMockSessionDTO);
        }
        // get all the users with their answers for a specific mock
        [HttpGet("/UserMockSessions/mock/{mockId}/user/{UserId}")]

        public async Task<ActionResult<IEnumerable<UserMockSessionDTO>>> UserMockSessions(int mockId, string UserId)
        {
            var UserMockSession = await _unitOfWork.UserMockSessions.GetAllAsync(a => a.MockId == mockId && a.UserId == UserId, properties: a => a.Answers);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            var userMockSessionDTO = _mapper.Map<IEnumerable<UserMockSessionDTO>>(UserMockSession);
            return Ok(userMockSessionDTO);
        }

        // delete the user answers for a specific mock
        [HttpDelete("/UserMockSessions/{userId?}/mock/{mockId}")]
        public async Task<ActionResult> DeleteUserMockSession(int mockId, string? userId)
        {
            if (userId == null)
            {
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            }
            if (userId == null)
            {
                return Unauthorized();
            }

            var UserMockSession = await _unitOfWork.UserMockSessions.GetUserMockSessionsAsync(userId, mockId);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            await _unitOfWork.UserMockSessions.RemoveRangeAsync(UserMockSession);
            await _unitOfWork.SaveAsync();
            return Ok();
        }
        [HttpPost("/MockVideoAnswer/{id}/SetAiScores")]

        public async Task<ActionResult> SetAiScores(int id, [FromBody] VideoAiScoreDto videoAiScoreDto)
        {

            var videoAnswer = await _unitOfWork.MockVideoAnswers.GetByIdAsync(id);
            if (videoAnswer == null)
            {
                return BadRequest("No Mock Session Available ");
            }
            var AiScore = _mapper.Map<VideoAiScore>(videoAiScoreDto);
            videoAnswer.AnswerAiEvaluationScores = AiScore;
            await _unitOfWork.SaveAsync();
            return Ok();
        }
    }
}
