namespace IntelliView.Models.DTO.Interview
{
    public class UserListDTO
    {
        public int userMockSessionId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string ImageURL { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public decimal CvScore { get; set; }
        public double? TotalInterviewScore { get; set; }
        public bool IsApproved { get; set; }
    }
}
