using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class ApplyJobDTO
    {
        public string Id { get; set; }
        [JsonIgnore]
        public string JobId { get; set; }
        [JsonIgnore]
        public string IndividualUserId { get; set; }
        public string Status { get; set; } = "Pending";
    }
}
