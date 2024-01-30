using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.job
{
    [PrimaryKey(nameof(InterestedTopicId), nameof(UserId))]
    public class UserInterestedTopic
    {
        [Column(Order = 0)]
        public int InterestedTopicId { get; set; }
        [ForeignKey(nameof(InterestedTopicId))]
        public virtual InterestedTopic InterestedTopic { get; set; }
        [Column(Order = 1)]
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public virtual IndividualUser IndividualUser { get; set; }
    }
}
