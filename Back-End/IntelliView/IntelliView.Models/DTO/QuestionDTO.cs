using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class QuestionDTO
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public virtual List<string> ?MCQOptions { get; set; }
        [JsonIgnore]
        public int JobId { get; set; }
    }
}
