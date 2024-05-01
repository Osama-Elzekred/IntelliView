using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.Interview
{
    [PrimaryKey(nameof(UserId), nameof(MockId))]

    public class UserMockSession
    {
        [Column(Order = 0)]
        public string UserId { get; set; }

        // ID of the mock interview
        [Column(Order = 1)]
        public int MockId { get; set; }
        [ForeignKey(nameof(MockId))]
        public virtual InterviewMock InterviewMock { get; set; }

        // Optional: ID of the job application this mock interview is associated with
        public int? JobId { get; set; }
        // Assuming JobApplication has a composite key, this property won't be directly mapped
        [ForeignKey("JobId,UserId")]
        public virtual JobApplication? UserApplication { get; set; }

        // Collection of answers given during the mock interview
        public virtual List<MockVideoAnswer> Answers { get; set; } = new List<MockVideoAnswer>();
    }
}
