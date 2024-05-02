using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using IntelliView.Models.DTO.Interview;
using IntelliView.Models.Models;
using IntelliView.Models.Models.Interview;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace IntelliView.API.Controllers
{
    [Route("api/Interview")]
    [ApiController]
    [Authorize(policy: "UserOrCompany")]

    public class InterviewController : ControllerBase
    {
        private readonly IInterviewService _interviewService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUploadFilesToCloud _uploadFilesToCloud;
        public InterviewController(IInterviewService interviewService, IUnitOfWork unitOfWork, IUploadFilesToCloud uploadFilesToCloud, IMapper mapper)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _interviewService = interviewService;
            _uploadFilesToCloud = uploadFilesToCloud;
        }
        [HttpGet("Mock/{id}")]
        public async Task<IActionResult> StartInterviewMock(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("The user dosnt exist");
            }
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(m => m.Id == id, properties: m => m.InterviewQuestions);
            if (mock is null)
            {
                return NotFound("Mock not found");
            }
            var mockSession = await _unitOfWork.UserMockSessions.GetByIdAsync(userId, id);
            if (mockSession is not null)
            {
                return BadRequest("You have already joined this mock interview");
            }

            JobApplication? jobApplication = null;
            // for jobs 
            if (mock.JobId is not null)
            {
                jobApplication = await _unitOfWork.JobApplications.GetByIdAsync(mock.JobId, userId);
            }
            var questions = _mapper.Map<List<InterviewSessionQuestionsDto>>(mock.InterviewQuestions);


            return Ok(new InterviewSessionDto()
            {
                Questions = questions ?? new List<InterviewSessionQuestionsDto>(),
                Title = mock.Title,
                JobId = mock.JobId,
                Authorized = true ? jobApplication is not null || mock.JobId is null : false,
            });
        }


        [HttpPost("answer")]
        public IActionResult SubmitAnswer([FromBody] InterviewAnswerDto answerDto)
        {
            var nextQuestion = _interviewService.ProcessAnswer(answerDto);
            return Ok(new { Question = nextQuestion });
        }
        [HttpGet("getMock")]
        public async Task<ActionResult<InterviewMock>> getMock(int id)
        {
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(x => x.Id == id, properties: m => m.InterviewQuestions);
            if (mock == null)
                return NotFound();
            return Ok(new
            {
                Questions = mock.InterviewQuestions?.Select(m => new { m.Id, m.Question, m.VideoId, m.Url }),
                mock.Id,
                mock.Title,
                mock.Description
            });
        }
        // show all existing VideoAnswers with the users associated with the mock

        // start interview mock , return session id , and first question Dto
        // update the videoAnswer of a user for a question then upload it to cloudinary
        [HttpPost("mock/{mockId}/question/{questionId}")]
        public async Task<IActionResult> UploadVideo(IFormFile video, int mockId, int questionId)
        {
            if (video == null || video.Length == 0)
                return BadRequest("No file uploaded");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var mock = await _unitOfWork.InterviewMocks.GetFirstOrDefaultAsync(m => m.Id == mockId, properties: m => m.InterviewQuestions);
            if (mock is null)
            {
                return NotFound("Mock not found");
            }
            var question = mock.InterviewQuestions.FirstOrDefault(q => q.Id == questionId);
            if (question is null)
            {
                return NotFound("Question not found");
            }
            // mocks without job or jobApplication
            var AnswerVideoLink = await _uploadFilesToCloud.UploadVideo(video, $"{userId}_{mockId}_{question.Id}");
            // var AnswerVideoLink = "https://res.cloudinary.com/djvcgnkbn/video/upload/v1714341443/cddda85e-d5df-4d46-9442-4e44281720b8_1_1.mkv";

            if (AnswerVideoLink == string.Empty)
            {
                return BadRequest("Error while uploading the video");
            }
            var AnswersEvaluationScores = await _interviewService.GetAiVideoScores(AnswerVideoLink, question.ModelAnswer);

            if (AnswersEvaluationScores is null)
            {
                return BadRequest("Error while calculating the similarity score");
            }


            var userMockInterviewSession = await _unitOfWork.UserMockSessions
                   .GetFirstOrDefaultAsync(s => s.UserId == userId && s.MockId == mock.Id);

            if (userMockInterviewSession == null)
            {
                // Create a new UserMockSession with an empty answer
                userMockInterviewSession = new UserMockSession
                {
                    UserId = userId,
                    MockId = mock.Id,
                    JobId = mock.JobId,
                    //CreatedAt = DateTime.Now,
                };

                // Add the UserMockSession to the context for saving
                await _unitOfWork.UserMockSessions.AddAsync(userMockInterviewSession);
                await _unitOfWork.SaveAsync();

            }

            if (userMockInterviewSession.Answers.Any(a => a.InterviewQuestionId == questionId))
            {
                // Handle duplicate answer scenario (throw error, log warning, etc.)
                return BadRequest("An answer for this question already exists in the session.");
            }
            // Update the existing UserMockSession by adding a new answer
            userMockInterviewSession.Answers.Add(new MockVideoAnswer
            {
                InterviewQuestionId = question.Id, // Assuming InterviewQuestion has a navigation property for InterviewQuestionId
                AnswerText = "",
                AnswerVideoURL = AnswerVideoLink,
                UserId = userId,
                MockId = mock.Id,
                AnswerAiEvaluationScores = AnswersEvaluationScores,
                AnsweredAt = DateTime.Now,
            });

            // Save changes
            await _unitOfWork.SaveAsync();

            return Ok("Upload successful");
        }

    }
}
