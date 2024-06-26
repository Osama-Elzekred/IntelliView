﻿namespace IntelliView.Models.Models
{
    public class CompanyUser : ApplicationUser
    {

        // Properties for CompanyUser
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyWebsite { get; set; } = string.Empty;
        public string CompanyOverview { get; set; } = string.Empty;
        public string CompanySize { get; set; } = string.Empty;
        public string CompanyType { get; set; } = string.Empty;
        public string CompanyFounded{ get; set; } = string.Empty;
        public string CompanySpecialties { get; set; } = string.Empty;

        // Navigation property for Applications created by the company
        //public virtual ICollection<InterviewApplication> Applications { get; set; }


        //// Navigation property for InterviewSessions created by the company
        //public virtual ICollection<InterviewSession> InterviewSessions { get; set; }
    }
}
