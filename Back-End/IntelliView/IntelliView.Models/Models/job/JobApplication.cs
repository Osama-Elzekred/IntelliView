﻿using Microsoft.EntityFrameworkCore;
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

        public string FullName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Phone { get; set; } = String.Empty;
        public string Gender { get; set; } = String.Empty;
        public byte[]? CV { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }

        // User's answers to the job questions
        public virtual ICollection<UserJobAnswer>? UserAnswers { get; set; }

        // Documents uploaded by the user (e.g., resume)
        //public virtual string ResumeURL { get; set; }
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;
        public bool IsApproved { get; set; }
    }
    public enum ApplicationStatus
    {
        Pending,
        Accepted,
        Rejected
    }
}
