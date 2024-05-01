using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Models.Models.job;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IInterviewService
    {
        InterviewQuestion? GetMockNextQuestion(string sessionId);
        Task<string?> StartInterviewMock(int MockID);
        InterviewQuestion? ProcessAnswer(InterviewAnswerDto answerDto);
        bool SessionExists(string sessionId);
        Task AddInterviewVideos(InterviewMock Mock);
        Task<VideoAiScore> GetAiVideoScores(string answerVideoLink, string modelAnswer);
    }
}
