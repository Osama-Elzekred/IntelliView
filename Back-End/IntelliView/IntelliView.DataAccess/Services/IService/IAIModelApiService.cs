using Microsoft.AspNetCore.Http;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IAIModelApiService
    {
        Task<string> SendRequestAsync(MultipartFormDataContent content, string url, string apiKey);
        Task<string> GetCVmatch(IFormFile? resumePath, string jd);

        Task<string> GetFaceDetectionInfo(string videoLink);
    }
}
