using AutoMapper;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO.Interview;
using IntelliView.Models.Models;
using IntelliView.Models.Models.Interview;
using IntelliView.Utility;
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
        [Authorize(Roles = SD.ROLE_USER)]
        public async Task<IActionResult> StartInterviewMock(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("The user does not exist");
            }
            var user = User.FindFirstValue(userId);
            //check if user is approved to this job
            if (user == null)
            {

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
        [Authorize(Roles = SD.ROLE_USER)]
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
            //mocks without job or jobApplication
            var AnswerVideoLink = await _uploadFilesToCloud.UploadVideo(video, $"{userId}_{mockId}_{question.Id}");
            //string AnswerVideoLink;
            //switch (question.Question[0])
            //{
            //    case '1':
            //        AnswerVideoLink = "https://drive.usercontent.google.com/download?id=1tjB5g9IolIG-tCkzrl5rFBIqYtCg4Z2s&export=download&authuser=0";
            //        break;
            //    case '2':
            //        AnswerVideoLink = "https://drive.usercontent.google.com/download?id=1_7MTGr2cVbc1Y7bdt3LLeMxjBlHuhthW&export=download&authuser=0";
            //        break;
            //    case '3':
            //        AnswerVideoLink = "https://drive.usercontent.google.com/download?id=18dQ2uJhCxPGoa7NLv2ylJXR9LeR0r-o1&export=download&authuser=0";
            //        break;
            //    case '4':
            //        AnswerVideoLink = "https://drive.usercontent.google.com/download?id=1pHe4Ray6vdlQGlJJdrc0GmDVEwTyWKTO&export=download&authuser=0";
            //        break;
            //    default:
            //        AnswerVideoLink = "https://drive.usercontent.google.com/download?id=1tjB5g9IolIG-tCkzrl5rFBIqYtCg4Z2s&export=download&authuser=0";
            //        break;
            //}


            if (AnswerVideoLink == string.Empty)
            {
                return BadRequest("Error while uploading the video");
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
            //string answerurl = "https://www.youtube.com/embed/0_6AK52kSVQ?si=LryV2WrMDvx92DfE";
            var mockVideoAnswer = new MockVideoAnswer
            {
                InterviewQuestionId = question.Id, // Assuming InterviewQuestion has a navigation property for InterviewQuestionId
                AnswerText = "",
                UserMockSessionId = MockSessionId,
                AnswerVideoURL = AnswerVideoLink,
                //AnswerAiEvaluationScores = AnswersEvaluationScores,
                AnsweredAt = DateTime.Now,
            };
            await _unitOfWork.MockVideoAnswers.AddAsync(mockVideoAnswer);

            await _unitOfWork.SaveAsync();
            _interviewService.GetAiVideoScores(AnswerVideoLink, question.ModelAnswer, mockVideoAnswer);

            //if (AnswersEvaluationScores is null)
            //{
            //    return BadRequest("Error while calculating the similarity CvScore");
            //}

            // Update the existing UserMockSession by adding a new answer

            return Ok("Upload successful");
        }
        // get all users who had joined a mock interview to one job
        [HttpGet("mock/{mockId}/users")]
        [Authorize(Roles = SD.ROLE_COMPANY)]
        public async Task<ActionResult<IEnumerable<UserListDTO>>> GetUsersForMock(int mockId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var mock = await _unitOfWork.InterviewMocks.GetByIdAsync(mockId);
            if (mock == null)
                return NotFound("Mock not found");
            if (mock.JobId is null)
                return BadRequest("This mock is not associated with a job");



            var job = await _unitOfWork.Jobs.GetByIdAsync(mock.JobId);
            if (job == null)
                return NotFound("Job not found");

            if (userId == null || userId != job.CompanyUserId)
            {
                return Unauthorized("The user dosn`t exist");
            }
            var applicants = await _unitOfWork.UserMockSessions.GetSessionsWithJobApplicationAsync(mockId);
            if (applicants == null)
                return NotFound();
            return Ok(applicants);
        }
    }
}
