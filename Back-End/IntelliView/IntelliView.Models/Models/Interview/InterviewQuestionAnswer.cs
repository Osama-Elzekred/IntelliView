using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.Interview
{
    public class InterviewQuestionAnswer
    {
        [Key]
        public int Id { get; set; }

        public int UserApplicationId { get; set; }

        public int JobId { get; set; }

        public string UserId { get; set; }

        [ForeignKey("JobId,UserId")]
        public virtual JobApplication UserApplication { get; set; }

        public int InterviewQuestionId { get; set; }
        public string Answer { get; set; }
        public DateTime AnsweredAt { get; set; } = DateTime.Now;
    }
}
