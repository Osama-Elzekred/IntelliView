﻿using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class ProfileDTO
    {
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyWebsite { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImageURl { get; set; } = string.Empty;
        public string CVURL { get; set; } = string.Empty;
        public string CompanyOverview { get; set; } = string.Empty;
        public string CompanySize { get; set; } = string.Empty;
        public string CompanyType { get; set; } = string.Empty;
        public string CompanyFounded { get; set; } = string.Empty;
        public string CompanySpecialties { get; set; } = string.Empty;

    }
}
