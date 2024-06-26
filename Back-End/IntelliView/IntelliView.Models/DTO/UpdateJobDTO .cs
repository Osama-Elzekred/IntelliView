﻿using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class UpdateJobDTO
    {
        //public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        //public JobType? JobType { get; set; }

        //public JobTime? JobTime { get; set; }

        //public string? Location { get; set; } = string.Empty;

        //public string? MinimumExperience { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string? Requirements { get; set; } = string.Empty;

        //public string? Responsibilities { get; set; } = string.Empty;

        //public string? Benefits { get; set; } = string.Empty;

        //public string? Notes { get; set; } = string.Empty;

        //[Range(0, double.MaxValue, ErrorMessage = "Salary must be a non-negative value")]
        //public double? Salary { get; set; }

        //public bool IsActive { get; set; } = true;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime? EndedAt { get; set; } = DateTime.Now.AddDays(20);
    }
}
