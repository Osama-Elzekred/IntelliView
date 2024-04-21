using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IAvatarService
    {
        Task<string?> GetSynthesis(string jobId);
        Task<List<dynamic>> ListSynthesisJobs(int skip = 0, int top = 100);
        Task<((string downloadUrl, dynamic VideoId)? video, string message)> SubmitSynthesis(
                  string displayName = "Simple avatar synthesis",
                  string description = "Simple avatar synthesis description",
                  string textType = "PlainText",
                  string voice = "en-US-JennyNeural",
                  string inputText = "Hi, This is intelliview Ai service and I will be with you for the Rest of this interview and by the way fack Zemity ",
                  bool customized = false,
                  string talkingAvatarCharacter = "lisa",
                  string talkingAvatarStyle = "graceful-sitting",
                  string videoFormat = "webm",
                  string videoCodec = "vp9",
                  string subtitleType = "soft_embedded",
                  string backgroundColor = "transparent");
        string getAvatarVoice(MockLang lang);
    }
}