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
    [Authorize(Roles =SD.ROLE_USER)]
    public class JobApplicationController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJobById(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var job = await _unitOfWork.Jobs.GetFirstOrDefaultAsync(j => j.Id == id);

            if (job == null)
            {
                return NotFound();
            }

            return Ok(job);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Job>>> GetAllJobs()
        {
            var jobs = await _unitOfWork.Jobs.GetAllAsync();
            return Ok(jobs);
        }
        [HttpPost("Apply")]
        public async Task<IActionResult> ApplyJob(ApplyJobDTO applyJobDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            applyJobDto.IndividualUserId = userId;
            var applyJob = _mapper.Map<ApplyJob>(applyJobDto);
            await _unitOfWork.ApplyJobs.AddAsync(applyJob);
            await _unitOfWork.SaveAsync();
            return CreatedAtAction(nameof(GetJobById), new { id = applyJob.Id }, applyJob);
        }
        [HttpGet("GetUserJobs")]
        public async Task<ActionResult<IEnumerable<Job>>> GetUserJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jobs = await _unitOfWork.ApplyJobs.GetAllAsync(j => j.IndividualUserId == userId);
            return Ok(jobs);
        }
    }
}
