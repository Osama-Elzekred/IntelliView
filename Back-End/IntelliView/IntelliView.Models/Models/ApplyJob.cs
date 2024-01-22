using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.Models
{
    public class ApplyJob
    {
        public int Id { get; set; }
        public int JobId { get; set; }

        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
        public string IndividualUserId { get; set; }

        [ForeignKey(nameof(IndividualUserId))]
        public virtual IndividualUser IndividualUser { get; set; }
        public string Status { get; set; }= "Pending";

    }
}
