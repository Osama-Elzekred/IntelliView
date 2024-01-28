using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    [PrimaryKey(nameof(InterestedTopicId), nameof(JobId))]
    public class JobInterestedTopic
    {
        [Column(Order = 0)]
        public int InterestedTopicId { get; set; }
        [ForeignKey(nameof(InterestedTopicId))]
        public virtual InterestedTopic InterestedTopic { get; set; }
        [Column(Order = 1)]
        public int JobId { get; set; }
        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }

    }
}
