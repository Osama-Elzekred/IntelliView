using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class InterviewEmailDTO
    {
        public DateTime InterviewDate { get; set; } = DateTime.Now;
        public string InterviewLink { get; set; } = "https://localhost:7049/InterviewMock/1";
    }

}
