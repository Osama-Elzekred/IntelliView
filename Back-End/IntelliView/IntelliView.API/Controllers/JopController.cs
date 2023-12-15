using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles =SD.ROLE_COMPANY)]
    public class JopController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        public JopController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //var jops = await _unitOfWork.Jops.GetAllAsync();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jops = await _unitOfWork.Jops.GetAllAsync(j => j.CompanyUserId == userId);
            return Ok(jops);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            //var jop = await _unitOfWork.Jops.GetFirstOrDefaultAsync(j => j.Id == id);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jop = await _unitOfWork.Jops.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);
            if (jop == null)
            {
                return NotFound();
            }
            return Ok(jop);
        }
        [HttpPost]
        public async Task<IActionResult> Post(Jop jop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier);
            jop.CompanyUserId = userId.Value;
            await _unitOfWork.Jops.AddAsync(jop);
            await _unitOfWork.SaveAsync();
            return CreatedAtAction(nameof(Get), new { id = jop.Id }, jop);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Jop jop)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (id != jop.Id || userId != jop.CompanyUserId)
            {
                return BadRequest();
            }
            _unitOfWork.Jops.Update(jop);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var jop = await _unitOfWork.Jops.GetFirstOrDefaultAsync(j => j.Id == id && j.CompanyUserId == userId);
            if (jop == null)
            {
                return NotFound();
            }
            await _unitOfWork.Jops.RemoveAsync(jop);
            await _unitOfWork.SaveAsync();
            return NoContent();
        }
    }
}
