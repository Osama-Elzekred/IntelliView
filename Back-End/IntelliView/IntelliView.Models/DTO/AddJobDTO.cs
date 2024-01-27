using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class AddJobDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        public JobType? Jobtype { get; set; }

        public JobTime? Jobtime { get; set; }

        public string? Location { get; set; } = string.Empty;

        public string? MinimumExperience { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string? Requirements { get; set; } = string.Empty;

        //public string? Responsibilities { get; set; } = string.Empty;

        //public string? Benefits { get; set; } = string.Empty;

        //public string? Notes { get; set; } = string.Empty;

        //[Range(0, double.MaxValue, ErrorMessage = "Salary must be a non-negative value")]
        public double? Salary { get; set; }

        //public bool IsActive { get; set; } = true;

        //public bool IsDeleted { get; set; } = false;

        //[Required(ErrorMessage = "CompanyUserId is required")]
        public string? CompanyUserId { get; set; }

        //[ForeignKey(nameof(CompanyUserId))]
        //public virtual CompanyUser CompanyUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime? EndedAt { get; set; } = DateTime.Now.AddDays(20);

        public enum JobType
        {
            Remote,
            OnSite,
            Hybrid
        }

        public enum JobTime
        {
            FullTime,
            PartTime
        }
    }
}
