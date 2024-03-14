using AutoMapper;
using IntelliView.Models.DTO;
using IntelliView.Models.DTO.Interview;
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
            //    Answer = q.Answer
            //}) : new List<InterviewQuestion>()));
            CreateMap<Job, AddJobDto>()
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndedAt.ToString()));
            CreateMap<AddInterviewMockDTO, InterviewMock>()
           .ForMember(dest => dest.Videos, opt => opt.MapFrom(src => src.Videos));

            //CreateMap<InterviewVideoDTO, InterviewVideo>();

            CreateMap<InterviewMock, AddInterviewMockDTO>()
                .ForMember(dest => dest.Videos, opt => opt.MapFrom(src => src.Videos));
            //CreateMap<InterviewVideo, InterviewVideoDTO>();
            //CreateMap<AddInterviewMockDTO, InterviewMock>().ReverseMap();

            CreateMap<DisplayInterviewMockDto, InterviewMock>()
            .ForMember(dest => dest.Level, opt => opt.MapFrom(src => src.Level.ToString()))
            .ReverseMap();
            CreateMap<AddInterviewTopicDTO, InterviewMockTopic>().ReverseMap();

            CreateMap<AddInterviewMockDTO, InterviewMock>()
          .ForMember(dest => dest.InterviewTopicId, opt => opt.MapFrom(src => src.InterviewTopicId)) // Assuming InterviewTopicId maps directly
          .ForMember(dest => dest.Videos, opt => opt.MapFrom(src => src.Videos));

            CreateMap<InterviewVideoDTO, InterviewVideo>(); // Mapping configuration for InterviewVideoDTO to InterviewVideo


        }
    }
}
