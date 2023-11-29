using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.Models
{
    public class AppUser 
    {
        public string UserName { get; set; } 
        public string Password { get; set; }
    }
}
