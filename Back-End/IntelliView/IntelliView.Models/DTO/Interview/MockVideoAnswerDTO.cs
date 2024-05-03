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
        public DateTime AnsweredAt { get; set; }
    }
    public class VideoAiScoreDto
    {
        public decimal AnswerSimilarityScore { get; set; }
        public string VideoInfo { get; set; }
        public string AudioInfo { get; set; }
        public string TextInfo { get; set; }
    }

}