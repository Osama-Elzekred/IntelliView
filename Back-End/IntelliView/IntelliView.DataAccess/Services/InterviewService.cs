﻿using InteliView.DataAccess.Data;
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
                    string url = "https://cvoiceprodweu.blob.core.windows.net/batch-synthesis-output/d1f4220d-38d7-4df1-9a51-8865e5eef17f/0001.webm?skoid=85130dbe-2390-4897-a9e9-5c88bb59daff&sktid=33e01921-4d64-4f8c-a055-5bdaffd5e33d&skt=2024-03-23T23%3A36%3A50Z&ske=2024-03-29T23%3A41%3A50Z&sks=b&skv=2023-11-03&sv=2023-11-03&st=2024-03-23T23%3A36%3A50Z&se=2024-03-24T11%3A41%3A50Z&sr=b&sp=rl&sig=2wZlgInbWkKdYDn2Qd32fKAcbjI9BFFvfjuTUGewWB8%3D";
                    question.Url = url;
                    question.VideoId = "d1f4220d-38d7-4df1-9a51-8865e5eef17f";


                    context.Entry(question).State = EntityState.Modified;
                }
            }
            await context.SaveChangesAsync();
        }
    }
}

