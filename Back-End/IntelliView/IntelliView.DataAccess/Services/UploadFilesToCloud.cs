using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace IntelliView.DataAccess.Services
{
    public class UploadFilesToCloud : IUploadFilesToCloud
    {
        private readonly IConfiguration Configuration;
        private readonly HttpClient _httpClient = new HttpClient();
        public UploadFilesToCloud(IConfiguration configuration)
        {
            Configuration = configuration;

        }
        [Obsolete]
        public async Task<string> UploadFile(IFormFile file, string fileName)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(fileName, file.OpenReadStream()),
                    PublicId = Path.GetFileNameWithoutExtension(fileName), // Optionally, set the PublicId
                    Overwrite = true
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if (uploadResult.SecureUri != null)
                {
                    string url = uploadResult.SecureUri.ToString();

                    // Adding Optimization to the image url (f_auto,q_auto)
                    url = url.Insert(url.IndexOf("/upload") + 7, "/f_auto,q_auto");

                    return url;
                }
                else
                    return String.Empty;
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
                if (uploadResult.SecureUri != null)
                    return uploadResult.SecureUri.ToString();
                else
                    return String.Empty;
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }

        [Obsolete]
        public async Task<string> UploadVideo(IFormFile videoFile, string fileName)
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
                if (uploadResult.SecureUri != null)
                    return uploadResult.SecureUri.ToString();
                else
                    return String.Empty;
            }
            catch (Exception)
            {
                return String.Empty;
            }
        }

        public async Task<bool> DeleteFile(string url)
        {
            try
            {
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                string publicId = url.Substring(url.LastIndexOf("/") + 1, url.LastIndexOf(".") - url.LastIndexOf("/") - 1);

                var deleteParams = new DeletionParams(publicId);
                var result = await cloudinary.DestroyAsync(deleteParams);
                if (result.Result == "ok")
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<VideoUploadResult?> UploadVideo(string downloadUrl, dynamic VideoId)
        {
            var response = await _httpClient.GetAsync(downloadUrl).ConfigureAwait(false);
            if (!response.IsSuccessStatusCode) return null;

            using (var stream = await response.Content.ReadAsStreamAsync().ConfigureAwait(false))
            {
                // Upload the video to Cloudinary
                Cloudinary cloudinary = new Cloudinary(Configuration.GetSection("CLOUDINARY_URL").Value);
                cloudinary.Api.Secure = true;

                cloudinary.Api.UrlVideoUp.Transform(new Transformation()
                  .Width(500).Crop("scale").Chain()
                  .Quality(35).Chain()
                  .FetchFormat("auto")).BuildVideoTag("intersection_aerial");

                var uploadParams = new VideoUploadParams
                {
                    File = new FileDescription($"{VideoId}.webm", stream),
                    PublicId = VideoId, // Optionally, set the PublicId
                    Overwrite = true
                };

                return await cloudinary.UploadAsync(uploadParams).ConfigureAwait(false);

            }
        }
    }
}
