﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IntelliView.Models.Models.Interview
{
    //[PrimaryKey(nameof(UserId), nameof(MockId))]

    public class UserMockSession
    {
        //[Column(Order = 0)]
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }

        // ID of the mock interview
        //[Column(Order = 1)]
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int MockId { get; set; }
        [ForeignKey(nameof(MockId))]
        //public DateTime CreatedAt { get; set; } = DateTime.Now;
        public virtual InterviewMock InterviewMock { get; set; }

        // Optional: ID of the job application this mock interview is associated with
        public int? JobId { get; set; }
        //// Assuming JobApplication has a composite key, this property won't be directly mapped
        [ForeignKey(nameof(JobId))]
        public virtual Job? Job { get; set; }
        //public int? JobApplicationId { get; set; }

        [ForeignKey($"{nameof(JobId)}, {nameof(UserId)}")]
        public virtual JobApplication? UserApplication { get; set; }

        // Collection of answers given during the mock interview
        public virtual List<MockVideoAnswer> Answers { get; set; } = new List<MockVideoAnswer>();
        public double? TotalInterviewScore { get; set; } = null;
    }
}
