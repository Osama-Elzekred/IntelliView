using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class ApplyJobDTO
    {
        public string Id { get; set; }
        public string JobId { get; set; }
        public string IndividualUserId { get; set; }
        public string Status { get; set; } = "Pending";
    }
}
