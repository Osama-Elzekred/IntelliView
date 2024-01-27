using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.Models.job
{
    public class JobInterestedTopic
    {
        public int Id { get; set; }
        public virtual InterestedTopic InterestedTopic { get; set; }
        public int JobId { get; set; }
        public virtual Job Job { get; set; }
    }
}
