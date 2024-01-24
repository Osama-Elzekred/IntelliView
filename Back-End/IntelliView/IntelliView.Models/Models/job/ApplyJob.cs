using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class ApplyJob
    {
        public int Id { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

        public string IndividualUserId { get; set; }

        [ForeignKey(nameof(IndividualUserId))]
        public virtual IndividualUser IndividualUser { get; set; }
        public StatusType Status { get; set; } = StatusType.Pending;

    }
    public enum StatusType
    {
        Pending,
        Accepted,
        Rejected
    }
}