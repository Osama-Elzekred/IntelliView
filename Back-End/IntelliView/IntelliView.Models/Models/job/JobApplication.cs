using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
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
        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }

        // User's answers to the job questions
        public virtual ICollection<UserJobAnswer> UserAnswers { get; set; }

        // Documents uploaded by the user (e.g., resume)
        public virtual string ResumeURL { get; set; }
    }
}
