using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    public class InterviewQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string ModelAnswer { get; set; }
        public string? Url { get; set; }
        public string? VideoId { get; set; }
        public int MockId { get; set; }
        [ForeignKey(nameof(MockId))]
        public InterviewMock InterviewMock { get; set; }
    }

    public class CustQuestion
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

        public virtual UserJobAnswer UserJobAnswer { get; set; }
    }
}
