using IntelliView.Models.Models;
using System.Text.Json.Serialization;

namespace IntelliView.Models.DTO
{
    public class AddJobDto
    {
        public string Title { get; set; }
        public string JobType { get; set; }
        public string JobTime { get; set; }
        public string Location { get; set; }
        public string MinimumExperience { get; set; }
        public string Description { get; set; }
        public string Requirements { get; set; }
        public MockLang MockLanguage { get; set; } = MockLang.English;
        public List<QuestionItemDto>? QuestionItems { get; set; }
        public List<CustQuestionDto>? CustQuestions { get; set; }
        public List<JobInterestedTopicDto>? JobInterestedTopics { get; set; }
        public string EndDate { get; set; } = DateTime.Now.AddDays(30).ToString("yyyy-MM-dd");
        public string ImageURl { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";
        [JsonIgnore]
        public string? CompanyUserId { get; set; } = string.Empty;
    }

    public class QuestionItemDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int JobId { get; set; }
    }

    public class CustQuestionDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public int JobId { get; set; }
    }

    public class JobInterestedTopicDto
    {
        public int InterestedTopicId { get; set; }
        public string Topic { get; set; }

        public int JobId { get; set; }
    }
}
