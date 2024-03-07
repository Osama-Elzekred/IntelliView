using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    public class InterviewQuestion
    {
        public long Id { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
    }

    public class CustQuestion
    {
        public long Id { get; set; }
        public string Question { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
    }
}
