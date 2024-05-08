using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO.Interview
{
    public class UserListDTO
    {
        public string UserId { get; set; } = string.Empty;
        public string ImageURL { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";
        public string Name { get; set; } = string.Empty; 
        public string Email { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int score { get; set; }
        public bool IsApproved { get; set; } 
    }
}
