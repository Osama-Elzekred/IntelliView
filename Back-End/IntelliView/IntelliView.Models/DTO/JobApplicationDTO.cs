namespace IntelliView.Models.DTO
{
    public class JobApplicationDTO
    {
        public int JobId { get; set; }

        public string UserId { get; set; }

        public string ResumeURL { get; set; }

        // Additional properties as needed for your DTO

        // For example, you might include a collection of answers to job questions
        public List<UserJobAnswerDTO> UserAnswers { get; set; }
    }

    public class UserJobAnswerDTO
    {
        public int QuestionId { get; set; }

        public string Answer { get; set; }
    }

}
