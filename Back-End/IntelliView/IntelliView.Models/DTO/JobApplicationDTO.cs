
namespace IntelliView.Models.DTO
{
    public class JobApplicationDto
    {
        public int JobId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public byte[]? CV { get; set; }
        public string QuestionsAnswers { get; set; }
    }

}
