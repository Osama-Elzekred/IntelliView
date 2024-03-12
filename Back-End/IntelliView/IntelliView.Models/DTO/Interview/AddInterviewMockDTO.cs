using IntelliView.Models.Models;

namespace IntelliView.Models.DTO.Interview
{
    public class AddInterviewMockDTO
    {
        public string Title { get; set; } // e.g., "Software Developer", "Marketing Manager", etc.
        public string Description { get; set; } // e.g., "This is a mock interview for a software developer position."
        public InterviewLevel Level { get; set; } // e.g., "Entry Level", "Intermediate", "Expert", etc.
        public int InterviewTopicId { get; set; } // Foreign key for InterviewMockTopic
        //[ForeignKey(nameof(InterviewTopicId))]
        public ICollection<InterviewVideoDTO> Videos { get; set; } // Collection of interview videos
    }

    public class InterviewVideoDTO
    {
        public string ContentText { get; set; } // Textual link description
        public string Url { get; set; } // URL for the link
    }

    public class AddInterviewTopicDTO
    {
        public string Topic { get; set; }
        public string Description { get; set; }
        public string IconClass { get; set; } // Changed from IconText to IconClass
    }

}
