using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models
{
    public class UserJobAnswer
    {
        [Key]
        public int Id { get; set; }

        // Foreign key to the associated user application
        public int UserApplicationId { get; set; }

        // Navigation property to the associated user application
        [ForeignKey(nameof(UserApplicationId))]
        public virtual JobApplication UserApplication { get; set; }

        // Foreign key to the associated question
        public int QuestionId { get; set; }

        // Navigation property to the associated question
        [ForeignKey(nameof(QuestionId))]
        public virtual JobQuestion Question { get; set; }

        // User's answer content
        public string Answer { get; set; }
    }
}
