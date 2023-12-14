using IdentityModel;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    [Authorize(Roles = SD.ROLE_USER)]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;
            var user = await _userManager.FindByNameAsync(userId);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] ProfileDTO updatedUser)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;
            var user = await _userManager.FindByNameAsync(userId);

            if (user != null)
            {
                if (User.IsInRole(SD.ROLE_COMPANY) && user is CompanyUser companyUser)
                {
                    companyUser.CompanyName = updatedUser.CompanyName;
                    companyUser.CompanyDescription = updatedUser.CompanyDescription;
                    companyUser.CompanyWebsite = updatedUser.CompanyWebsite;

                    await _userManager.UpdateAsync(companyUser);

                    return Ok(companyUser);
                }
                else if (User.IsInRole(SD.ROLE_USER) && user is IndividualUser individualUser)
                {
                    individualUser.FirstName = updatedUser.FirstName;
                    individualUser.LastName = updatedUser.LastName;

                    await _userManager.UpdateAsync(individualUser);

                    return Ok(individualUser);
                }
            }

            return NotFound();
        }
    }
}
