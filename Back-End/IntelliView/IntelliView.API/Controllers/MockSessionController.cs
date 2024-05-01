using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
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

        [HttpGet("/UserMockSession/{userId?}/mock/{mockId}")]
        public async Task<ActionResult<UserMockSessionDTO>> UserMockSession(int mockId, string? userId)
        {
            if (userId == null)
            {
                userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            }
            if (userId == null)
            {
                return Unauthorized();
            }

            var UserMockSession = await _unitOfWork.UserMockSessions.GetUserMockSessionAsync(mockId, userId);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            var userMockSessionDTO = _mapper.Map<UserMockSessionDTO>(UserMockSession);
            return Ok(userMockSessionDTO);
        }
        // get all the users with their answers for a specific mock
        [HttpGet("/UserMockSession/mock/{mockId}")]

        public async Task<ActionResult<IEnumerable<UserMockSessionDTO>>> UserMockSession(int mockId)
        {
            var UserMockSession = await _unitOfWork.UserMockSessions.GetAllAsync(a => a.MockId == mockId, properties: a => a.Answers);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            var userMockSessionDTO = _mapper.Map<IEnumerable<UserMockSessionDTO>>(UserMockSession);
            return Ok(userMockSessionDTO);
        }

        // delete the user answers for a specific mock
        [HttpDelete("/UserMockSession/{userId?}/mock/{mockId}")]
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

            var UserMockSession = await _unitOfWork.UserMockSessions.GetUserMockSessionAsync(mockId, userId);
            if (UserMockSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            await _unitOfWork.UserMockSessions.RemoveAsync(UserMockSession);
            await _unitOfWork.SaveAsync();
            return Ok();
        }

    }
}
