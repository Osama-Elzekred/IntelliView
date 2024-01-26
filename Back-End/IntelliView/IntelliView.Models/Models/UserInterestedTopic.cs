using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.Models.job
{
    public class UserInterestedTopic
    {
        public int InterestedTopicId { get; set; }
        public virtual InterestedTopic InterestedTopic { get; set; }
        public string UserId { get; set; }
        public virtual IndividualUser IndividualUser { get; set; }
    }
}
