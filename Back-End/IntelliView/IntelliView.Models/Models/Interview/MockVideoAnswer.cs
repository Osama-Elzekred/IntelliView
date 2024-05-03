using IntelliView.Models.DTO;
using IntelliView.Models.Models.job;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.Interview
{
    public class MockVideoAnswer

    {
        [Key]
        public int Id { get; set; }
        public int UserMockSessionId { get; set; }
        [ForeignKey(nameof(UserMockSessionId))]
        public virtual UserMockSession? UserMockSession { get; set; }

        public int InterviewQuestionId { get; set; }
        [ForeignKey("InterviewQuestionId")]
        public virtual InterviewQuestion? InterviewQuestion { get; set; }
        public string AnswerVideoURL { get; set; } = string.Empty;
        public string AnswerText { get; set; } = string.Empty;

        // Assuming VideoAiScore is a separate entity and this is the principal in the relationship
        public virtual VideoAiScore? AnswerAiEvaluationScores { get; set; }

        public DateTime AnsweredAt { get; set; } = DateTime.Now;
    }
}
