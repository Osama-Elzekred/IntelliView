using IntelliView.Models.DTO.Interview;

namespace IntelliView.API.Controllers
{
    public class MockVideoAnswerDTO
    {
        public int Id { get; set; }
        //[JsonIgnore]
        public int UserMockSessionId { get; set; }
        public int InterviewQuestionId { get; set; }
        public string AnswerVideoURL { get; set; }
        public string AnswerText { get; set; }
        // Assuming VideoAiScore is a complex type, you might want to include a simplified version or just an ID/reference
        public VideoAiScoreDto AnswerAiEvaluationScore { get; set; }
        public InterviewQuestionDTO InterviewQuestion { get; set; }
        public DateTime AnsweredAt { get; set; }
    }

    public class VideoAiScoreDto
    {
        public int MockVideoAnswerId { get; set; }
        public decimal? AnswerSimilarityScore { get; set; }
        public string? AnswerText { get; set; }
        public decimal? SentimentScore { get; set; }
        public List<EmotionScoreDto>? EmotionScores { get; set; }
        public decimal? ComparisonScore { get; set; }
    }

    public class EmotionScoreDto
    {
        public DateTime Timestamp { get; set; }
        public Dictionary<string, double>? Scores { get; set; }
    }



}