using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class InterviewSession
    {
        [Key]
        public int Id { get; set; }

        // Properties for InterviewSession
        public string Position { get; set; }=string.Empty;
        public DateOnly Date { get; set; }
        // Other properties...
        public InterviewSessionStatus Status { get; set; }
        public Topic Topic { get; set; }

        // Foreign key to CompanyUser
        //public string CompanyUserId { get; set; }

        //// Navigation property to CompanyUser
        //[ForeignKey(nameof(CompanyUserId))]
        //public virtual CompanyUser CompanyUser { get; set; }

        // Navigation property for Applications received for this session
        public virtual ICollection<InterviewApplication> Applications { get; set; }
        public virtual ICollection<InterviewQuestion> Questions { get; set; }
    }
    public enum Topic
    {
        Technical,
        Behavioral,
        Other
    }
    public enum InterviewSessionStatus
    {
        Open,
        Closed
    }
}
