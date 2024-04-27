using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class JobDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = string.Empty;

        public string? JobType { get; set; } = string.Empty;

        public string? JobTime { get; set; } = string.Empty;

        public string? Location { get; set; } = string.Empty;

        public string? MinimumExperience { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public string? Requirements { get; set; } = string.Empty;

        public string? Responsibilities { get; set; } = string.Empty;

        public string? Benefits { get; set; } = string.Empty;

        public string? companyName { get; set; } = string.Empty;

        public string? Notes { get; set; } = string.Empty;

        //[Range(0, double.MaxValue, ErrorMessage = "Salary must be a non-negative value")]
        //public double? Salary { get; set; }

        public bool IsActive { get; set; } = true;

        //public bool IsDeleted { get; set; } = false;

        //[Required(ErrorMessage = "CompanyUserId is required")]
        public string? CompanyUserId { get; set; }

        //[ForeignKey(nameof(CompanyUserId))]
        //public virtual CompanyUser CompanyUser { get; set; }
        public string ImageURl { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";

        //[JsonIgnore]
        public virtual List<string> JobInterestedTopic { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime? EndedAt { get; set; }
    }

}
