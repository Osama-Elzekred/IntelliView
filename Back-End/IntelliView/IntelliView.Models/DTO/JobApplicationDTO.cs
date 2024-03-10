namespace IntelliView.Models.DTO
{
    public class JobApplicationDTO
    {
        public int JobId { get; set; }

        public string? UserId { get; set; }

        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string? ResumeURL { get; set; }

        // Additional properties as needed for your DTO

        // For example, you might include a collection of answers to job questions
        public virtual List<UserJobAnswerDTO> UserAnswers { get; set; } = new List<UserJobAnswerDTO>();
    }

    public class UserJobAnswerDTO
    {
        public int QuestionId { get; set; }

        public string? Answer { get; set; }
    }

}
