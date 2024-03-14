using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    public class UploadFilesToCloud : IUploadFilesToCloud
    {
        private readonly IConfiguration Configuration;
        public UploadFilesToCloud(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        [Obsolete]
        public async Task<string> UploadFile(IFormFile file,string fileName)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(fileName, file.OpenReadStream()),
                    PublicId = Path.GetFileNameWithoutExtension(fileName), // Optionally, set the PublicId
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
        public async Task<string> UploadImage(IFormFile image, string fileName)
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
                cloudinary.Api.UrlImgUp.Transform(transformation).BuildImageTag(fileName);

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(fileName, image.OpenReadStream()),
                    UseFilename = true,
                    UniqueFilename = false,
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if(uploadResult != null && uploadResult.SecureUri !=null )
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
        public async Task<string> UploadVideo(IFormFile videoFile,string fileName)
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
                    File = new FileDescription(fileName, videoFile.OpenReadStream()),
                    PublicId = Path.GetFileNameWithoutExtension(fileName), // Optionally, set the PublicId
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if(uploadResult != null && uploadResult.SecureUri !=null )
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
