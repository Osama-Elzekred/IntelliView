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
    internal class UploadFilesToCloud : IUploadFilesToCloud
    {
        private readonly IConfiguration Configuration;
        public UploadFilesToCloud(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public Task<string> UploadFile(IFormFile file)
        {
            throw new NotImplementedException();
        }

        [Obsolete]
        public async Task<string> UploadImage(IFormFile image)
        {
            try
            {

                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.FileName, image.OpenReadStream()),
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
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

        public Task<string> UploadVideo(IFormFile video)
        {
            throw new NotImplementedException();
        }
    }
}
