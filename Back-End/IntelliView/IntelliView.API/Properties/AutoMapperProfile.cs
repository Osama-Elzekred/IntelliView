using AutoMapper;
using IntelliView.API.Controllers;
using IntelliView.Models.DTO;
using IntelliView.Models.DTO.Interview;
using IntelliView.Models.Models;
using IntelliView.Models.Models.Interview;
using IntelliView.Models.Models.job;

namespace ANWAAR.CORE
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<Product, ProductVM>().ReverseMap();
            //CreateMap<ProductCategory, ProductVM>().ReverseMap();
            //CreateMap<Product, ProductVM>();
            CreateMap<Job, JobDTO>()
                 .ForMember(dest => dest.JobInterestedTopic, opt => opt.MapFrom(src => src.JobInterestedTopic.Select(j => j.InterestedTopic).Select(it => it.Topic).ToList()))
                .ReverseMap();
            CreateMap<UpdateJobDTO, Job>().ReverseMap();
            CreateMap<CompanyUser, ProfileDTO>().ReverseMap();
            CreateMap<IndividualUser, ProfileDTO>().ReverseMap();

            CreateMap<AddJobDto, Job>()
           .ForMember(dest => dest.EndedAt, opt => opt.MapFrom(src => DateTime.Parse(src.EndDate)));
            //.ForMember(dest => dest.JobInterestedTopic, opt => opt.MapFrom(src => src.JobInterestedTopics != null ? src.JobInterestedTopics.Select(topic => new JobInterestedTopic
            //{
            //    InterestedTopic = new InterestedTopic
            //    {
            //        Topic = topic.Topic
            //    }
            //}) : new List<JobInterestedTopic>()))
            //.ForMember(dest => dest.JobQuestions, opt => opt.MapFrom(src => src.CustQuestions != null ? src.CustQuestions.Select(q => new CustQuestion
            //{
            //    CustQuestion = q.CustQuestion
            //}) : new List<CustQuestion>()))
            //.ForMember(dest => dest.InterviewQuestions, opt => opt.MapFrom(src => src.QuestionItems != null ? src.QuestionItems.Select(q => new InterviewQuestion
            //{
            //    CustQuestion = q.CustQuestion,
            //    ModelAnswer = q.ModelAnswer
            //}) : new List<InterviewQuestion>()));
            CreateMap<Job, AddJobDto>()
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndedAt.ToString()));

            CreateMap<InterviewMock, AddInterviewMockDTO>()
                .ForMember(dest => dest.InterviewQuestions, opt => opt.MapFrom(src => src.InterviewQuestions));

            CreateMap<DisplayInterviewMockDto, InterviewMock>()
            .ForMember(dest => dest.Level, opt => opt.MapFrom(src => src.Level.ToString()))
            .ReverseMap();
            CreateMap<AddInterviewTopicDTO, InterviewMockTopic>().ReverseMap();

            CreateMap<AddInterviewMockDTO, InterviewMock>()
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.Level, opt => opt.MapFrom(src => src.Level))
            .ForMember(dest => dest.InterviewTopicId, opt => opt.MapFrom(src => src.InterviewTopicId))
            .ForMember(dest => dest.InterviewQuestions, opt => opt.MapFrom(src => src.InterviewQuestions)) // Map InterviewQuestions property
            .ReverseMap(); // Automatically create reverse mapping

            CreateMap<InterviewQuestionDTO, InterviewQuestion>().ReverseMap(); // Map InterviewQuestionDTO to InterviewQuestion
            CreateMap<InterviewSessionQuestionsDto, InterviewQuestion>().ReverseMap();
            //////////////////////
            // Mapping from MockVideoAnswer entity to MockVideoAnswerDTO
            CreateMap<UserMockSession, UserMockSessionDTO>()
                .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers));
            CreateMap<MockVideoAnswer, MockVideoAnswerDTO>()
                .ForMember(dest => dest.AnswerAiEvaluationScore, opt => opt.MapFrom(src => src.AnswerAiEvaluationScores)).ReverseMap();

            // Mapping from VideoAiScore entity to VideoAiScoreDto
            CreateMap<VideoAiScore, VideoAiScoreDto>().ReverseMap();



        }
        //private List<QuestionsAndAnswersDTO> MapUserAnswersToDTO(ICollection<UserJobAnswer> userAnswers)
        //{
        //    var questionsAndAnswersDtoList = new List<QuestionsAndAnswersDTO>();

        //    foreach (var userAnswer in userAnswers)
        //    {
        //        var questionAndAnswerDto = new QuestionsAndAnswersDTO
        //        {
        //            Question = userAnswer.CustQuestion.Question,
        //            Answer = userAnswer.Answer
        //        };

        //        questionsAndAnswersDtoList.Add(questionAndAnswerDto);
        //    }

        //    return questionsAndAnswersDtoList;
        //}
    }
}
