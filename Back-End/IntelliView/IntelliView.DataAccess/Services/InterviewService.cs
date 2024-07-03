using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.Models;
using IntelliView.Models.Models.Interview;
using IntelliView.Models.Models.job;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

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
        private readonly IAIModelApiService _aiModelApiService;
        public InterviewService(IUnitOfWork unitOfWork, IAIModelApiService aiSearchService, IAvatarService avatarService, IUploadFilesToCloud uploadFilesToCloud, IConfiguration configuration, ILogger<InterviewService> logger, IDbContextFactory<ApplicationDbContext> contextFactory)
        {
            _unitOfWork = unitOfWork;
            _interviewSessions = new Dictionary<string, List<InterviewQuestion>>();
            _interviewMocks = new Dictionary<string, InterviewMock>();
            _avatarService = avatarService;
            _uploadFilesService = uploadFilesToCloud;
            Configuration = configuration;
            _logger = logger;
            _contextFactory = contextFactory;
            _aiModelApiService = aiSearchService;
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
        public async Task<int> GetAiVideoScores(string answerVideoLink, string modelAnswer, MockVideoAnswer mockVideoAnswer)
        {
            using var context = _contextFactory.CreateDbContext();
            int Counter = 0;
            _logger.LogInformation("Starting GetAiVideoScores for video link: {AnswerVideoLink}", answerVideoLink);

            string AiJsonResponse;
            VideoAnalysisDTO? aiResponse = null;

            try
            {
                do
                {
                    AiJsonResponse = await _aiModelApiService.FetchVideoAnalysisData(answerVideoLink);
                    Counter++;
                    _logger.LogInformation("Attempt {Counter}: AI response: {AiJsonResponse}", Counter, AiJsonResponse);

                    // Check if the response contains an error
                    if (AiJsonResponse.Contains("\"status\":\"failed\""))
                    {
                        _logger.LogWarning("AI response indicates failure: {AiJsonResponse}", AiJsonResponse);
                        return 1;
                    }

                    // Unescape the JSON response
                    string unescapedJsonResponse = Regex.Unescape(AiJsonResponse).Trim('"');

                    // Attempt to deserialize the response
                    try
                    {
                        aiResponse = JsonConvert.DeserializeObject<VideoAnalysisDTO>(unescapedJsonResponse);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Deserialization error for video link: {AnswerVideoLink}, JSON: {AiJsonResponse}", answerVideoLink, AiJsonResponse);
                        return 1;
                    }

                } while (aiResponse is null || aiResponse.Status != "success" && Counter < 5);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching video analysis data for video link: {AnswerVideoLink}", answerVideoLink);
                return 1;
            }

            if (aiResponse is null || aiResponse.Status != "success")
            {
                _logger.LogWarning("Failed to get a successful AI response after {Counter} attempts for video link: {AnswerVideoLink}", Counter, answerVideoLink);
                return 1;
            }

            var emotionScores = aiResponse.VideoAnalysis.Select(kv => new EmotionScore
            {
                Time = decimal.Parse(kv.Key),
                Scores = kv.Value
            }).ToList();


            double? AnswerSimilarity;
            string? RecommendationText;
            string question = mockVideoAnswer?.InterviewQuestion?.Question ?? "Unavailable";
            try
            {
                do
                {
                    var similarityTask = _aiModelApiService.FetchModelAnswerSimilarityAI(aiResponse.Text, modelAnswer);
                    var recommendationTask = _aiModelApiService.FetchRecommendationAI(aiResponse.Text, modelAnswer, question);

                    await Task.WhenAll(similarityTask, recommendationTask);

                    AnswerSimilarity = await similarityTask;
                    RecommendationText = await recommendationTask;
                    _logger.LogInformation("Attempt {Counter}: Answer similarity: {AnswerSimilarity}, Recommendation: {RecommendationText}", Counter, AnswerSimilarity, RecommendationText);

                    Counter++;
                } while (AnswerSimilarity is null && Counter < 5);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching similarity and recommendation for video link: {AnswerVideoLink}", answerVideoLink);
                return 1;
            }

            var videoAiScore = new VideoAiScore
            {
                MockVideoAnswerId = mockVideoAnswer.Id,
                AnswerText = aiResponse.Text,
                SentimentScore = aiResponse.TextAnalysis,
                EmotionScores = emotionScores,
                AnswerSimilarityScore = AnswerSimilarity,
                RecommendationText = RecommendationText
            };
            // Calculate the total score
            videoAiScore.UpdateTotalScore();

            context.VideoAiScores.Add(videoAiScore);

            // Ensure EmotionScores are tracked by the context
            foreach (var emotionScore in emotionScores)
            {
                context.Entry(emotionScore).State = EntityState.Added;
            }

            // Update the MockVideoAnswer entity
            mockVideoAnswer.AnswerAiEvaluationScores = videoAiScore;
            context.Entry(mockVideoAnswer).State = EntityState.Modified;

            await context.SaveChangesAsync();
            _logger.LogInformation("Completed GetAiVideoScores for video link: {AnswerVideoLink}", answerVideoLink);

            return 0;
        }
    }
}

