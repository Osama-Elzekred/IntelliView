using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class JobApplication
    {
        public int JobId { get; set; }

        // Navigation property to the associated job
        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
        public string UserId { get; set; }

        // Navigation property to the associated user (applicant)
        [ForeignKey(nameof(UserId))]
        public virtual IndividualUser User { get; set; }

        // User's answers to the job questions
        public virtual ICollection<UserJobAnswer> UserAnswers { get; set; }

        // Documents uploaded by the user (e.g., resume)
        public virtual string ResumeURL { get; set; }
    }
}
