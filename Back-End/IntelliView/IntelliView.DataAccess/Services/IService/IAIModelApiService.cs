using IntelliView.Models.Models;
using Microsoft.AspNetCore.Http;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IAIModelApiService
    {
        Task<string> SendRequestAsync(HttpClient httpClient, MultipartFormDataContent content, string url, string apiKey);
        Task<string> GetCVmatch(IFormFile? resumePath, string jd);

        Task<string> GetFaceDetectionInfo(string videoLink);

        Task<string> FetchVideoAnalysisData(string videoLink, MockLang lang = MockLang.English);
        Task<double?> FetchModelAnswerSimilarityAI(string answerVideotext, string modelAnswer, string question);
        Task<string?> FetchRecommendationAI(string answerVideotext, string modelAnswer, string Question = "Unavailable");
    }
}
