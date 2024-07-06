namespace IntelliView.Models.DTO
{
    public class InterviewEmailDTO
    {
        public string InterviewDate { get; set; } = $"{DateTime.Now}";
        public string InterviewLink { get; set; } = "https://www.inteliview.me/interview/video-interview/";
    }

}
