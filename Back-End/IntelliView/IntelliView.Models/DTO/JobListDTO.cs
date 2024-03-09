using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class JobListDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Location { get; set; } = string.Empty;
        public string? Jobtype { get; set; }= string.Empty;
        public string? Jobtime { get; set; }= string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyLogo { get; set; } = @"wwwroot/Assets/images/7495e58b-b72b-4b87-8c12-c77a69b39cd3.jpg";

    }
}
