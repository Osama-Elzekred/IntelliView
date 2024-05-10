using IntelliView.Models.Models;
using System.Text.Json.Serialization;

namespace IntelliView.Models.DTO.Interview
{
    public class AddInterviewMockDTO
    {
        public string Title { get; set; } // e.g., "Software Developer", "Marketing Manager", etc.
        public string Description { get; set; } // e.g., "This is a mock interview for a software developer position."
        public InterviewLevel Level { get; set; }   // e.g., "Entry Level", "Intermediate", "Expert", etc.
        public MockLang Language { get; set; } = MockLang.English; // e.g., "English", "Arabic", etc.
        public string? Icon { get; set; } = "fa-play-circle"; // e.g., "fa-play-circle", "fa-play", etc.
        public int InterviewTopicId { get; set; } // Foreign key for InterviewMockTopic
        //[ForeignKey(nameof(InterviewTopicId))]
        public ICollection<InterviewQuestionDTO>? InterviewQuestions { get; set; } // Collection of interview videos
    }

    public class InterviewQuestionDTO
    {
        public string Question { get; set; } // Textual link description
        public string ModelAnswer { get; set; } // URL for the link
        [JsonIgnore]
        public int InterviewMockId { get; set; } // Foreign key for InterviewMock


    }

    public class AddInterviewTopicDTO
    {
        public string Topic { get; set; }
        public string Description { get; set; }
        public string IconClass { get; set; } // Changed from IconText to IconClass
    }

}
