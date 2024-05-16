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

        [HttpGet("mockTitle/{id}")]
        public async Task<ActionResult<string>> GetMockTitle(int id)
        {
            var mock = await _unitOfWork.InterviewMocks.GetByIdAsync(id);
            if (mock == null)
                return NotFound();
            return Ok(new { mock.Title });
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
            JobApplication? jobApplication = null;
            // for jobs 
            if (mock.JobId is not null)
            {
                jobApplication = await _unitOfWork.JobApplications.GetByIdAsync(mock.JobId, userId);
            }

            //var mockSession = await _unitOfWork.UserMockSessions.GetByIdAsync(userId, id);
            if (jobApplication?.MockSessionId is not null)
            {
                return BadRequest("You have already joined this mock interview");
            }
            var userMockInterviewSession = new UserMockSession
            {
                JobId = mock.JobId,
                UserId = userId,
                MockId = mock.Id,
                InterviewMock = mock,
                CreatedAt = DateTime.Now
            };
            // Add the UserMockSession to the context for saving
            await _unitOfWork.UserMockSessions.AddAsync(userMockInterviewSession);
            // assign the mock session id to the job application
            if (jobApplication is not null)
            {
                userMockInterviewSession.UserApplication = jobApplication;
            }
            await _unitOfWork.SaveAsync();
            // Update the JobApplication with the new UserMockSession ID
            if (jobApplication is not null)
            {
                // Set jobApplication.MockSessionId to the ID of the new UserMockSession
                jobApplication.MockSessionId = userMockInterviewSession.Id;
                await _unitOfWork.SaveAsync();
            }
            var questions = _mapper.Map<List<InterviewSessionQuestionsDto>>(mock.InterviewQuestions);


            return Ok(new InterviewSessionDto()
            {
                Questions = questions ?? new List<InterviewSessionQuestionsDto>(),
                Title = mock.Title,
                JobId = mock.JobId,
                MockSessionId = userMockInterviewSession.Id,
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
        [HttpPost("MockSession/{MockSessionId}/mock/{mockId}/question/{questionId}")]
        public async Task<IActionResult> UploadVideo(IFormFile video, int mockId, int questionId, int MockSessionId)
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
            //var AnswerVideoLink = await _uploadFilesToCloud.UploadVideo(video, $"{userId}_{mockId}_{question.Id}");
            var AnswerVideoLink = "https://res.cloudinary.com/djvcgnkbn/video/upload/v1714341443/cddda85e-d5df-4d46-9442-4e44281720b8_1_1.mkv";

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
                   .GetUserMockSessionAsync(MockSessionId);

            if (userMockInterviewSession == null)
            {
                return BadRequest("No Mock Session Available ");
            }

            if (userMockInterviewSession.Answers.Any(a => a.InterviewQuestionId == questionId))
            {
                // Handle duplicate answer scenario (throw error, log warning, etc.)
                return BadRequest("An answer for this question already exists in the session.");
            }
            // Update the existing UserMockSession by adding a new answer
            await _unitOfWork.MockVideoAnswers.AddAsync(new MockVideoAnswer
            {
                InterviewQuestionId = question.Id, // Assuming InterviewQuestion has a navigation property for InterviewQuestionId
                AnswerText = "",
                UserMockSessionId = MockSessionId,
                AnswerVideoURL = AnswerVideoLink,
                AnswerAiEvaluationScores = AnswersEvaluationScores,
                AnsweredAt = DateTime.Now,
            });

            // Save changes
            await _unitOfWork.SaveAsync();

            return Ok("Upload successful");
        }
        // get all users who had joined a mock interview to one job
        [HttpGet("mock/{mockId}/users")]
        public async Task<ActionResult<IEnumerable<UserListDTO>>> GetUsersForMock(int mockId)
        {
            var job = await _unitOfWork.Jobs.GetByIdAsync(mockId);
            if (job == null)
                return NotFound();
            int id = (int)job.MockId;
            var applicants = await _unitOfWork.UserMockSessions.GetSessionsWithJobApplicationAsync(id);
            if (applicants == null || applicants.Count() == 0)
                return NotFound();
            // Extract UserId values from the applicants collection
            //var userIds = applicants.Select(u => u.UserId).ToList();

            //// Query JobApplications based on userIds
            //var applications = await _unitOfWork.JobApplications.GetAllAsync(j => userIds.Contains(j.UserId));

            //var applications = await _unitOfWork.JobApplications.GetAllAsync(j => j.UserId == applicants.select(u => u.UserId));
            var users = applicants.Select(a => new UserListDTO
            {
                userMockSessionId = a.Id,
                UserId = a.UserId,
                Email = a.UserApplication?.Email ?? "",
                Name = a.UserApplication?.FullName ?? "",
                PhoneNumber = a.UserApplication?.Phone ?? "",
                score = 0,
                IsApproved = a.UserApplication?.IsInterviewApproved ?? false,
            });
            return Ok(users);
        }
    }
}
