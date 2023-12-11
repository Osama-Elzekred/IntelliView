using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class InterviewApplication
    {
        [Key]
        public int Id { get; set; }

        // Properties for InterviewApplication
        public int IndividualUserId { get; set; }

        // Foreign key to ApplicationUser (Normal User)
        [ForeignKey(nameof(IndividualUserId))]
        public virtual IndividualUser Applicant { get; set; }

        public int InterviewSessionId { get; set; }

        // Foreign key to InterviewSession
        [ForeignKey(nameof(InterviewSessionId))]
        public virtual InterviewSession InterviewSession { get; set; }

        // Other properties...
        public string? Feedback { get; set; }

        // Add properties for feedback or status if needed
    }
}
