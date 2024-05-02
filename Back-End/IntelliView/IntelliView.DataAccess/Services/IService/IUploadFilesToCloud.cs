using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IUploadFilesToCloud
    {
        Task<string> UploadImage(IFormFile image, string fileName);
        Task<string> UploadFile(IFormFile file, string fileName);
        Task<string> UploadVideo(IFormFile video, string fileName);
        Task<bool> DeleteFile(string publicId);
        //Task<VideoUploadResult?> UploadVideo(string downloadUrl, dynamic VideoId);
    }
}
