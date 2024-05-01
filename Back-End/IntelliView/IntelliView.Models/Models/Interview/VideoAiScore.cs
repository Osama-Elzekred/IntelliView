using IntelliView.Models.Models.Interview;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace IntelliView.Models.DTO
{
    public class VideoAiScore
    {
        [Key]
        public int InterviewQuestionAnswerId { get; set; }
        [JsonIgnore]
        [ForeignKey("InterviewQuestionAnswerId")]
        public virtual MockVideoAnswer InterviewQuestionAnswer { get; set; }
        [Column(TypeName = "decimal(18, 2)")]
        public decimal AnswerSimilarityScore { get; set; }
        public string VideoInfo { get; set; }
        public string AudioInfo { get; set; }
        public string TextInfo { get; set; }
    }
}
