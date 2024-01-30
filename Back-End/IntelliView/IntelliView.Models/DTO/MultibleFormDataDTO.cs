using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class MultibleFormDataDTO
    {
        public string name { get; set; } = string.Empty;

        public IFormFile photo { get; set; }

    }
}
