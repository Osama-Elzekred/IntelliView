using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class InterviewAnswerDto
    {
        public string SessionId { get; set; }=string.Empty;
        public int QuestionId { get; set; } 
        public string Answer { get; set; } = string.Empty;
    }
}
