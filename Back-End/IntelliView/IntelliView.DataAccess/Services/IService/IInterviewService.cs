using IntelliView.Models.Models;
using IntelliView.Models.Models.Interview;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IInterviewService
    {
        Task AddInterviewVideos(InterviewMock Mock);
        Task<int> GetAiVideoScores(string answerVideoLink, string modelAnswer, MockVideoAnswer mockVideoAnswer);
    }
}
