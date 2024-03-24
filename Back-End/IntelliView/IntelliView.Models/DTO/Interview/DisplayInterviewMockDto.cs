namespace IntelliView.Models.DTO.Interview
{
    public class DisplayInterviewMockDto
    {
        public int Id { get; set; }
        public string Title { get; set; } // e.g., "Software Developer", "Marketing Manager", etc.
        public string Description { get; set; } // e.g., "This is a mock interview for a software developer position."
        public string Level { get; set; }
        public string? Language { get; set; }

    }

}
