using IntelliView.Models.Models.job;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class UserJobAnswer
    {
        [Key]
        public int Id { get; set; }

        public int UserApplicationId { get; set; }

        public int JobId { get; set; }

        public string UserId { get; set; }

        [ForeignKey("JobId,UserId")]
        public virtual JobApplication UserApplication { get; set; }

        public int QuestionId { get; set; }

        [ForeignKey("QuestionId")]
        public virtual CustQuestion CustQuestion { get; set; }

        public string Answer { get; set; }
    }
}
