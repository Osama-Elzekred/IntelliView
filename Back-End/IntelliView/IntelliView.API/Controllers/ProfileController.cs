using AutoMapper;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Utility;
using IntelliView.Utility.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    //[Authorize(policy: "UserOrCompany")]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public readonly IWebHostEnvironment _webHostEnvironment;
        public readonly IUploadFilesToCloud _uploadFilesToCloud;
        public IMapper _mapper { get; }
        public ProfileController(UserManager<ApplicationUser> userManager, IUploadFilesToCloud uploadFilesToCloud,
            IWebHostEnvironment webHostEnvironment, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
            _uploadFilesToCloud = uploadFilesToCloud;
        }

        [HttpGet]
        public async Task<ActionResult<ProfileDTO>> GetProfile()
        {

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim?.Value;
            var user = await _userManager.FindByIdAsync(userId!);
            if (user == null)
            {
                return NotFound();
            }
            if (user is CompanyUser companyUser)
            {
                return Ok(new ProfileDTO
                {
                    IsCompany = true,
                    CompanyName = companyUser.CompanyName,
                    CompanyWebsite = companyUser.CompanyWebsite,
                    CompanyOverview = companyUser.CompanyOverview,
                    CompanySize = companyUser.CompanySize,
                    CompanyType = companyUser.CompanyType,
                    CompanyFounded = companyUser.CompanyFounded,
                    ImageURl = companyUser.ImageURl,
                    PhoneNumber = companyUser.PhoneNumber!
                });
            }
            else if (user is IndividualUser individualUser)
            {
                return Ok(new ProfileDTO
                {
                    IsCompany = false,
                    FirstName = individualUser.FirstName,
                    LastName = individualUser.LastName,
                    Title = individualUser.Title,
                    ImageURl = individualUser.ImageURl,
                    PhoneNumber = individualUser.PhoneNumber!,
                    CVURL = individualUser.CVURL
                });
            }
            return BadRequest();
        }

        //private ApplicationUser updatedImage = new ApplicationUser();
        [HttpPatch("updatePicture")]
        public async Task<IActionResult> updatePicture(IFormFile file)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim?.Value;

            if (file != null && userId != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                if (user != null)
                {
                    if (file.Length > FileSettings.MAxFileSizeInBytes)
                    {

                        return BadRequest(new { message = "File size should not be more than 5MB!" });
                    }
                    if (!FileSettings.AllowedExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
                    {
                        return BadRequest(new { message = "This file extension is not allowed!" });
                    }

                    string fileName = "image-" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // Delete the old cv if it exists
                    //if (!string.IsNullOrEmpty(user.ImageURl))
                    //{
                    //    bool deleted = await _uploadFilesToCloud.DeleteFile(user.ImageURl);
                    //    if(!deleted)
                    //    {
                    //        return BadRequest(new { message = "Failed to delete the old image!" });
                    //    }
                    //}

                    string ImageUri = await _uploadFilesToCloud.UploadImage(file, fileName);

                    if (ImageUri == String.Empty)
                    {
                        return BadRequest(new { message = "Failed to upload the image!" });
                    }

                    // Update the user's profile picture URL
                    user.ImageURl = ImageUri;
                    await _userManager.UpdateAsync(user);

                    return Ok(new { user.ImageURl }); // Return the URL of the updated image
                }
            }

            return BadRequest("No file or user found.");
        }

        [HttpPatch("updateCV")]
        [Authorize(Roles = SD.ROLE_USER)]
        public async Task<IActionResult> UploadCV(IFormFile file)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (file != null && userId != null)
            {
                var user = await _userManager.FindByIdAsync(userId);
                var individualUser = (IndividualUser)user!;
                if (individualUser != null)
                {
                    if (file.Length > FileSettings.MAxFileSizeInBytes)
                    {
                        return BadRequest(new { message = "File size should not be more than 5MB!" });
                    }
                    if (!FileSettings.AllowedCVExtensions.Contains(Path.GetExtension(file.FileName).ToLower()))
                    {
                        return BadRequest(new { message = "This file extension is not allowed!" });
                    }

                    string fileName = "cv-" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

                    // Delete the old cv if it exists
                    if (!string.IsNullOrEmpty(individualUser.CVURL))
                    {
                        bool deleted = await _uploadFilesToCloud.DeleteFile(individualUser.CVURL);
                        if (!deleted)
                        {
                            return BadRequest(new { message = "Failed to delete the old CV!" });
                        }
                    }

                    string CVUri = await _uploadFilesToCloud.UploadFile(file, fileName);

                    if (CVUri == String.Empty)
                    {
                        return BadRequest(new { message = "Failed to upload the CV!" });
                    }

                    // Update the user's CV URL
                    individualUser.CVURL = CVUri;
                    await _userManager.UpdateAsync(individualUser);
                    return Ok(individualUser.CVURL); // Return the URL of the updated CV
                }
            }
            return BadRequest("No file or user found.");
        }
        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileDTO updatedUser)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim?.Value;
            var user = await _userManager.FindByIdAsync(userId!);

            if (User.IsInRole(SD.ROLE_COMPANY) && user is CompanyUser companyUser)
            {
                companyUser.CompanyName = updatedUser.CompanyName;
                companyUser.CompanyWebsite = updatedUser.CompanyWebsite;
                companyUser.CompanyOverview = updatedUser.CompanyOverview;
                companyUser.CompanySize = updatedUser.CompanySize;
                companyUser.CompanyType = updatedUser.CompanyType;
                companyUser.CompanyFounded = updatedUser.CompanyFounded;
                companyUser.CompanySpecialties = updatedUser.CompanySpecialties;
                companyUser.PhoneNumber = updatedUser.PhoneNumber;

                await _userManager.UpdateAsync(companyUser);
                var updatedCompanyUser = _mapper.Map<ProfileDTO>(companyUser);
                return Ok(updatedCompanyUser);
            }
            else if (User.IsInRole(SD.ROLE_USER) && user is IndividualUser individualUser)
            {
                individualUser.FirstName = updatedUser.FirstName;
                individualUser.LastName = updatedUser.LastName;
                individualUser.Title = updatedUser.Title;
                individualUser.PhoneNumber = updatedUser.PhoneNumber;
                await _userManager.UpdateAsync(individualUser);
                var updatedIndividualUser = _mapper.Map<ProfileDTO>(individualUser);
                return Ok(updatedIndividualUser);
            }

            return NotFound();
        }



    }
}
