using IntelliView.Models.Models.Interview;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    [PrimaryKey(nameof(JobId), nameof(UserId))]

    public class JobApplication
    {

        // Foreign key to the associated job
        [Column(Order = 0)]
        public int JobId { get; set; }

        // Navigation property to the associated job
        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

        // Foreign key to the associated user (applicant)
        [Column(Order = 1)]
        public string UserId { get; set; }

        // Navigation property to the associated user (applicant)

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string CVURL { get; set; } = string.Empty;

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }

        // User's answers to the job questions
        public virtual ICollection<UserJobAnswer>? UserAnswers { get; set; }
        //public int MockId { get; set; }

        //[ForeignKey($"UserId,MockId")]
        public int? MockSessionId { get; set; }
        [ForeignKey(nameof(MockSessionId))]
        public virtual UserMockSession? UserMockSession { get; set; }

        // Documents uploaded by the user (e.g., resume)
        //public virtual string ResumeURL { get; set; }
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
        public bool IsApproved { get; set; }
        public bool IsInterviewApproved { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal CVScore { get; set; } = 0;
    }

    public enum ApplicationStatus
    {
        InterviewStage,
        Pending,
        Accepted,
        Rejected
    }
}
