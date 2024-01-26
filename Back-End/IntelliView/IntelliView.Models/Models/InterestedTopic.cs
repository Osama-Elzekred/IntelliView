using IntelliView.Models.Models.job;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.Models
{
    public class InterestedTopic
    {
        public int Id { get; set; }
        public string Topic { get; set; }=string.Empty;
        public virtual ICollection<UserInterestedTopic> UserInterestedTopics { get; set; } 
        public virtual ICollection<JobInterestedTopic> JobInterestedTopics { get; set; } 


    }
}
