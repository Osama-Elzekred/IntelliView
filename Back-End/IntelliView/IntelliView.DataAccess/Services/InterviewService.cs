using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using IntelliView.Models.Models.job;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace IntelliView.DataAccess.Services
{
    public class InterviewService : IInterviewService
    {
        private readonly Dictionary<string, List<InterviewQuestion>> _interviewSessions;
        private readonly IUnitOfWork _unitOfWork;
        private readonly Dictionary<string, InterviewMock> _interviewMocks;
        private readonly IAvatarService _avatarService;
        private readonly IUploadFilesToCloud _uploadFilesService;
        private readonly IConfiguration Configuration;
        private readonly HttpClient _httpClient = new HttpClient();
        private readonly ILogger<InterviewService> _logger;
        //private ApplicationDbContext _db;
        private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

        public InterviewService(IUnitOfWork unitOfWork, IAvatarService avatarService, IUploadFilesToCloud uploadFilesToCloud, IConfiguration configuration, ILogger<InterviewService> logger, IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _unitOfWork = unitOfWork;
            _interviewSessions = new Dictionary<string, List<InterviewQuestion>>();
            _interviewMocks = new Dictionary<string, InterviewMock>();
            _avatarService = avatarService;
            _uploadFilesService = uploadFilesToCloud;
            Configuration = configuration;
            _logger = logger;
            _contextFactory = contextFactory;
        }
        public bool SessionExists(string sessionId)
        {
            return _interviewSessions.ContainsKey(sessionId);
        }
        public InterviewQuestion? GetMockNextQuestion(string sessionId)
        {
            var sessionQuestions = _interviewSessions[sessionId];

            if (sessionQuestions.Count > 0)
            {

                var nextQuestion = sessionQuestions[0];
                sessionQuestions.RemoveAt(0);
                return nextQuestion;
            }
            else
            {
                return null;
            }

        }

        public InterviewQuestion? ProcessAnswer(InterviewAnswerDto answerDto)
        {
            if (_interviewSessions.ContainsKey(answerDto.SessionId))
            {
                // Here you can implement logic to process the answer,
                // such as saving it to a database or performing validation.
                // For this example, let's just return the next question.

                return GetMockNextQuestion(answerDto.SessionId);
            }
            else
            {
                return null;
            }
        }

        public async Task<string?> StartInterviewMock(int MockID)
        {
            var sessionId = Guid.NewGuid().ToString();
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(mk => mk.Id == MockID, properties: m => m.InterviewQuestions);
            if (mock == null)
            {
                return null;
            }
            _interviewSessions[sessionId] = mock.InterviewQuestions.ToList();
            _interviewMocks[sessionId] = mock;

            return sessionId;
        }

        // function that call the azure avatar api to create a video avatar for each question on the mock then
        // upload the video the cloud 
        // Disabled until deploying the DB
        public async Task AddInterviewVideos(InterviewMock Mock)
        {
            using var context = _contextFactory.CreateDbContext();
            ICollection<InterviewQuestion?> Questions = Mock.InterviewQuestions!;
            var Voice = _avatarService.getAvatarVoice(Mock.Language);
            foreach (var question in Questions)
            {
                if (question!.Url is null)
                {
                    //var result = await _avatarService.SubmitSynthesis(voice: Voice, inputText: question.Question);
                    //if (result.video is null) continue;
                    //var downloadUrl = result.video.Value.downloadUrl;
                    //var VideoId = result.video.Value.VideoId;

                    // Download the video
                    //var uploadResult = await _uploadFilesService.UploadVideo(downloadUrl, VideoId).ConfigureAwait(false);
                    //if (uploadResult is null || uploadResult.SecureUri is null) continue;
                    //question.Url = uploadResult.SecureUri.ToString();
                    //question.VideoId = VideoId;
                    string url = "https://res.cloudinary.com/djvcgnkbn/video/upload/f_auto:video,q_auto/36d203fb-eb46-4920-b8f2-ebc9cd339f98";
                    question.Url = url;
                    question.VideoId = "d1f4220d-38d7-4df1-9a51-8865e5eef17f";


                    context.Entry(question).State = EntityState.Modified;
                }
            }
            await context.SaveChangesAsync();
        }
        // get the ai score of the answer video from the Ai models
        public async Task<VideoAiScore> GetAiVideoScores(string answerVideoLink, string modelAnswer)
        {
            // Simulate an AI API call delay
            await Task.Delay(1000);

            // Assuming you get a response from the AI API which contains TextAnalysis data.
            // This is a mock example of the AI response.
            var aiResponse = new
            {
                TextAnalysis = new Dictionary<string, dynamic>
        {
            { "AnswerText"," this is my answer for ur question"},
            { "SentimentScore", -0.2 }
        },
                EmotionScores = new List<EmotionScore>
                    {
                        new EmotionScore { Timestamp = DateTime.Now, Scores = new Dictionary<string, double> { { "neutral", 0.58 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(1), Scores = new Dictionary<string, double> { { "happy", 0.74 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(2), Scores = new Dictionary<string, double> { { "neutral", 0.6 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(3), Scores = new Dictionary<string, double> { { "neutral", 0.57 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(4), Scores = new Dictionary<string, double> { { "fear", 0.28 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(5), Scores = new Dictionary<string, double> { { "sad", 0.57 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(6), Scores = new Dictionary<string, double> { { "neutral", 0.61 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(7), Scores = new Dictionary<string, double> { { "happy", 0.74 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(8), Scores = new Dictionary<string, double> { { "happy", 0.6 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(9), Scores = new Dictionary<string, double> { { "neutral", 0.5 } } },
                        new EmotionScore { Timestamp = DateTime.Now.AddSeconds(10), Scores = new Dictionary<string, double> { { "neutral", 0.57 } } }
                    }



            };

            // Extract AnswerText and SentimentScore from the AI response
            var AnswerText = aiResponse.TextAnalysis.ContainsKey("AnswerText") ? aiResponse.TextAnalysis["AnswerText"].ToString() : string.Empty;
            var sentimentScore = aiResponse.TextAnalysis.ContainsKey("SentimentScore") ? (decimal)aiResponse.TextAnalysis["SentimentScore"] : 0;

            return new VideoAiScore
            {
                AnswerSimilarityScore = 0.9m,
                AnswerText = AnswerText,
                SentimentScore = sentimentScore,
                EmotionScores = aiResponse.EmotionScores,
                ComparisonScore = 0.8m,

            };
        }

    }
}

