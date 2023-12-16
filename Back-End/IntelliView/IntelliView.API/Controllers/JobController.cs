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
    [Authorize(Roles = SD.ROLE_COMPANY)]
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetUserJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.Jobs.GetAllAsync(j => j.CompanyUserId == userId);
            return Ok(jobs);
        }

        [HttpGet("{id}")]
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

        [HttpPost]
        public async Task<ActionResult<Job>> CreateJob(AddJopDTO jopDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            jopDto.CompanyUserId = userId;

            var job = _mapper.Map<Job>(jopDto);
            await _unitOfWork.Jobs.AddAsync(job);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetJobById), new { id = job.Id }, job);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, AddJopDTO jopDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (id != jopDTO.Id || userId != jopDTO.CompanyUserId)
            {
                return BadRequest("Invalid request");
            }

            var job = _mapper.Map<Job>(jopDTO);
            await _unitOfWork.Jobs.Update(job);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
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

    }
}
