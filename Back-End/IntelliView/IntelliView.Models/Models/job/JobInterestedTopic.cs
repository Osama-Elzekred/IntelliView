using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    public class JobInterestedTopic
    {
        public int InterestedTopicId { get; set; }
        [ForeignKey(nameof(InterestedTopicId))]
        public virtual InterestedTopic InterestedTopic { get; set; }
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
