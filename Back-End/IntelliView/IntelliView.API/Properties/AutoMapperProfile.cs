using AutoMapper;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;

namespace ANWAAR.CORE
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //CreateMap<Product, ProductVM>().ReverseMap();
            //CreateMap<ProductCategory, ProductVM>().ReverseMap();
            //CreateMap<Product, ProductVM>();
            CreateMap<Job, JobDTO>().ReverseMap();
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
            //    Question = q.Question
            //}) : new List<CustQuestion>()))
            //.ForMember(dest => dest.InterviewQuestions, opt => opt.MapFrom(src => src.QuestionItems != null ? src.QuestionItems.Select(q => new InterviewQuestion
            //{
            //    Question = q.Question,
            //    Answer = q.Answer
            //}) : new List<InterviewQuestion>()));
            CreateMap<Job, AddJobDto>()
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndedAt.ToString()));
            //.ForMember(dest => dest.JobInterestedTopics, opt => opt.MapFrom(src => src.JobInterestedTopic != null ? src.JobInterestedTopic.Select(topic => new JobInterestedTopicDto
            //{
            //    Topic = topic.InterestedTopic.Topic
            //}) : new List<JobInterestedTopicDto>()))
            //.ForMember(dest => dest.CustQuestions, opt => opt.MapFrom(src => src.JobQuestions != null ? src.JobQuestions.Select(q => new CustQuestionDto
            //{
            //    Question = q.Question
            //}) : new List<CustQuestionDto>()))
            //.ForMember(dest => dest.QuestionItems, opt => opt.MapFrom(src => src.InterviewQuestions != null ? src.InterviewQuestions.Select(q => new QuestionItemDto
            //{
            //    Question = q.Question,
            //    Answer = q.Answer
            //}) : new List<QuestionItemDto>()));

        }
    }
}
