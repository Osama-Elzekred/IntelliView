namespace IntelliView.Models.DTO.Interview
{
    public class InterviewSessionQuestionsDto
    {
        public int Id { get; set; }
        public string Question { get; set; }
        public string? Url { get; set; }
        public string? VideoId { get; set; }
    }
    public class InterviewSessionDto
    {
        public List<InterviewSessionQuestionsDto> Questions { get; set; }
        public string? Title { get; set; }
        public int? JobId { get; set; }
        public int MockSessionId { get; set; }
        public bool Authorized { get; set; }

    }
}
