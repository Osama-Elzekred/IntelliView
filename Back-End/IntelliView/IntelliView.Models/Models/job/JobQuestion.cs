using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IntelliView.Models.Models
{
    public class JobQuestion
    {
        //public int Id { get; set; }
        //public string Question { get; set; } = string.Empty;
        //public string ModelAnswer { get; set; } = string.Empty;
        //public string UserAnswer { get; set; } = string.Empty;
        //public ushort IsAnswerValid { get; set; }
        //public int JobId { get; set; }
        //public virtual Job Job { get; set; }
        [Key]
        public int Id { get; set; }

        // The content of the question
        public string Content { get; set; }

        // Type of the question (e.g., Test, MCQ, TrueFalse)
        public QuestionType Type { get; set; }

        // Options for MCQs (applicable only if the question type is MCQ)

        public List<MCQOption>? MCQOptions { get; set; }

        // Foreign key to the associated job
        public int JobId { get; set; }

        // Navigation property to the associated job
        [ForeignKey(nameof(JobId))]
        public virtual Job Job { get; set; }
    }

    public enum QuestionType
    {
        Text,
        MCQ,
        TrueFalse
    }

    public class MCQOption
    {
        [Key]
        public int Id { get; set; }

        // The content of the MCQ option
        public string Content { get; set; }

        // Foreign key to the associated question
        public int QuestionId { get; set; }

        // Navigation property to the associated question
        [JsonIgnore]
        [ForeignKey(nameof(QuestionId))]
        public virtual JobQuestion JobQuestion { get; set; }
    }
}
