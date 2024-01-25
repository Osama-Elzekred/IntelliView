using IdentityModel;
using IntelliView.DataAccess.Repository;
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
    [Authorize(policy: "UserOrCompany")]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public readonly IWebHostEnvironment _webHostEnvironment;
        public ProfileController(UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        private ProfileDTO updatedUser = new ProfileDTO();
        
        [HttpPost]
        public Task Upload( IFormFile file )
        {

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;

                
                
                    string webRootPath = _webHostEnvironment.ContentRootPath;
                    if (file != null)
                    {
                        string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                        var imagePath = Path.Combine(webRootPath, @"wwwroot\Assets\images\");
                        //var imagePath = Path.Combine(webRootPath, "assets", "images", fileName);

                        if (!string.IsNullOrEmpty(updatedUser.ImageUrl))
                        {
                            //this is an edit and we need to remove old image
                            var oldimagePath = Path.Combine(webRootPath, updatedUser.ImageUrl.TrimStart('\\'));
                            if (System.IO.File.Exists(oldimagePath))
                            {
                                System.IO.File.Delete(oldimagePath);
                            }
                        }
                        using (var fileStream = new FileStream(Path.Combine(imagePath, fileName), FileMode.Create))
                        {
                            file.CopyTo(fileStream);
                        }
                        updatedUser.ImageUrl = @"wwwroot\Assets\images\" + fileName;
                    }
            return Task.CompletedTask;       
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileDTO updatedUser, IFormFile file)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;
            var user = await _userManager.FindByIdAsync(userId);
            try
            {
                if (updatedUser == null)
                {
                    return BadRequest("Invalid input for updating profile.");
                }
                if (user != null)
                {
                    string webRootPath = _webHostEnvironment.WebRootPath;
                    if (file != null)
                    {
                        string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                        var imagePath = Path.Combine(webRootPath, @"assets\images\");
                        //var imagePath = Path.Combine(webRootPath, "assets", "images", fileName);

                        if (!string.IsNullOrEmpty(updatedUser.ImageUrl))
                        {
                            //this is an edit and we need to remove old image
                            var oldimagePath = Path.Combine(webRootPath, updatedUser.ImageUrl.TrimStart('\\'));
                            if (System.IO.File.Exists(oldimagePath))
                            {
                                System.IO.File.Delete(oldimagePath);
                            }
                        }
                        using (var fileStream = new FileStream(Path.Combine(imagePath, fileName), FileMode.Create))
                        {
                            file.CopyTo(fileStream);
                        }
                        updatedUser.ImageUrl = @"\assets\images\" + fileName;
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(updatedUser.ImageUrl))
                        {
                            updatedUser.ImageUrl = updatedUser.ImageUrl.TrimStart('\\');
                        }
                    }
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
            catch (Exception ex)
            {
                // Handle exceptions and return appropriate error response...
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }
       
    }
}
