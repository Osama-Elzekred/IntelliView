using IntelliView.Models.Models.job;
using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.Models
{
    public class IndividualUser : ApplicationUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        public string CVURL { get; set; } = string.Empty;
        public virtual ICollection<UserInterestedTopic> UserInterestedTopics { get; set; } 

    }
}
