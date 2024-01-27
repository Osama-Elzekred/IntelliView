using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    public class UserInterestedTopic
    {
        public int InterestedTopicId { get; set; }
        [ForeignKey(nameof(InterestedTopicId))]
        public virtual InterestedTopic InterestedTopic { get; set; }
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual IndividualUser IndividualUser { get; set; }
    }
}
