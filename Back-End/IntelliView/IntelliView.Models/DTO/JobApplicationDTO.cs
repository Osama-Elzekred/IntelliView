﻿
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace IntelliView.Models.DTO
{
    public class JobApplicationDto
    {
        public int JobId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string CVURL { get; set; } = string.Empty;
        public string QuestionsAnswers { get; set; } = string.Empty;
        public int CVScore { get; set; } = 0;
        public List<QuestionsAndAnswersDTO>? QuestionsAndAnswers { get; set; }

        public IFormFile? CV { get; set; }
    }
    public class QuestionsAndAnswersDTO
    {
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
    }

}
