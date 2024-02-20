using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class ResetPasswordDTO
    {
        public string? Token { get; set; }
        public string? Email { get; set; }
        public string? NewPassword { get; set; } 
        public string? ConfirmPassword { get; set; }
    }
}
