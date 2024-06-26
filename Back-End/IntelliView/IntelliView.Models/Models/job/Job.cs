﻿using IntelliView.Models.Models.job;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IntelliView.Models.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string ImageURl { get; set; } 

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        public string JobType { get; set; } = string.Empty;

        public string JobTime { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Location is required")]
        public string? Location { get; set; } = string.Empty;

        //[Required(ErrorMessage = "MinimumExperience is required")]
        public string? MinimumExperience { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Description is required")]
        public string? Description { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Requirements are required")]
        public string? Requirements { get; set; } = string.Empty;

        public string? Responsibilities { get; set; }

        public string? Benefits { get; set; } = string.Empty;

        public string? Notes { get; set; } = string.Empty;

        //[Required(ErrorMessage = "Salary is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Salary must be a non-negative value")]
        public double? Salary { get; set; }

        //[Required(ErrorMessage = "InterviewDate is required")]

        public bool IsActive { get; set; } = true;

        public bool IsDeleted { get; set; } = false;

        [Required(ErrorMessage = "CompanyUserId is required")]
        public string CompanyUserId { get; set; }

        [ForeignKey(nameof(CompanyUserId))]
        public virtual CompanyUser CompanyUser { get; set; }

        public int? MockId { get; set; }
        [ForeignKey(nameof(MockId))]
        public InterviewMock? InterviewMock { get; set; }
        [JsonIgnore]
        public virtual ICollection<CustQuestion>? JobQuestions { get; set; }
        public virtual ICollection<JobInterestedTopic>? JobInterestedTopic { get; set; }

        public virtual ICollection<JobApplication>? JobApplications { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime? EndedAt { get; set; }

    }
}