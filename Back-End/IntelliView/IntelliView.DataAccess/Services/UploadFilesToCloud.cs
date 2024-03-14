using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace IntelliView.DataAccess.Services
{
    internal class UploadFilesToCloud : IUploadFilesToCloud
    {
        private readonly IConfiguration Configuration;
        public UploadFilesToCloud(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        //[Obsolete]
        public async Task<string> UploadFile(IFormFile file)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream()),
                    PublicId = Path.GetFileNameWithoutExtension(file.FileName), // Optionally, set the PublicId
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if (uploadResult != null && uploadResult?.SecureUri != null)
                    return uploadResult.SecureUri.ToString();
                else
                {
                    return String.Empty;
                }
            }
            catch (Exception)
            {
                return String.Empty;
            }

        }

        [Obsolete]
        public async Task<string> UploadImage(IFormFile image)
        {
            try
            {

                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                Transformation transformation = new Transformation()
                    .Width(500)
                    .Crop("scale")
                    .Quality("auto")
                    .FetchFormat("auto");
                cloudinary.Api.UrlImgUp.Transform(transformation).BuildImageTag(image.FileName);

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.FileName, image.OpenReadStream()),
                    UseFilename = true,
                    UniqueFilename = false,
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if (uploadResult != null && uploadResult.SecureUri != null)
                    return uploadResult.SecureUri.ToString();
                else
                {
                    return String.Empty;
                }
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }

        [Obsolete]
        public async Task<string> UploadVideo(IFormFile videoFile)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                cloudinary.Api.UrlVideoUp.Transform(new Transformation()
                  .Width(500).Crop("scale").Chain()
                  .Quality(35).Chain()
                  .FetchFormat("auto")).BuildVideoTag("intersection_aerial");

                var uploadParams = new VideoUploadParams
                {
                    File = new FileDescription(videoFile.FileName, videoFile.OpenReadStream()),
                    PublicId = Path.GetFileNameWithoutExtension(videoFile.FileName), // Optionally, set the PublicId
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if (uploadResult != null && uploadResult.SecureUri != null)
                    return uploadResult.SecureUri.ToString();
                else
                {
                    return String.Empty;
                }
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }
    }
}
