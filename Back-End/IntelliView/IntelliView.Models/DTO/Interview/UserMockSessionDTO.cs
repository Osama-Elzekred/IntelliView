namespace IntelliView.API.Controllers
{
    public class UserMockSessionDTO
    {
        public string UserId { get; set; }
        public int MockId { get; set; }
        public int? JobId { get; set; }
        //public DateTime CreatedAt { get; set; }
        // You might want to include DTOs for related entities instead of IDs if needed for the API
        // For example, a list of MockVideoQuestionAnswerDTOs if necessary
        public List<MockVideoAnswerDTO> Answers { get; set; }
    }

}