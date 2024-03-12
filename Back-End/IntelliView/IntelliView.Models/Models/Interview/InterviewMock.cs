using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IntelliView.Models.Models
{
    public class InterviewVideo
    {
        public int Id { get; set; }
        public string ContentText { get; set; } // Textual link description
        public string Url { get; set; } // URL for the  link
        public int InterviewMockId { get; set; } // Foreign key for InterviewMock
        [ForeignKey(nameof(InterviewMockId))]
        public InterviewMock InterviewMock { get; set; } // Navigation property for InterviewMock
    }

    public class InterviewMock
    {
        public int Id { get; set; }
        public string Title { get; set; } // e.g., "Software Developer", "Marketing Manager", etc.
        public string Description { get; set; } // e.g., "This is a mock interview for a software developer position."
        public InterviewLevel Level { get; set; }
        public int InterviewTopicId { get; set; } // Foreign key for InterviewMockTopic
        [ForeignKey(nameof(InterviewTopicId))]
        InterviewMockTopic InterviewTopic { get; set; }
        public ICollection<InterviewVideo> Videos { get; set; } // Collection of interview videos
    }

    public class InterviewMockTopic
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Description { get; set; }
        public string IconClass { get; set; }
        [JsonIgnore]
        public ICollection<InterviewMock> InterviewMockTopics { get; set; }
    }

    public enum InterviewLevel
    {
        None = 0,
        EntryLevel,
        Intermediate,
        Expert
    }


}
