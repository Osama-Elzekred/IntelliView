using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace IntelliView.Models.DTO
{
    public class AuthModel
    {
        public string? Message { get; set; }
        public bool IsAuthenticated { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; } = string.Empty;

        public string ? Id { get; set; }   
        public List<string>? Roles { get; set; }
        public string? Token { get; set; }
        public DateTime? ExpiresOn { get; set; }

        [JsonIgnore]
        public string? RefreshToken { get; set; } = string.Empty;

        public DateTime RefreshTokenExpiration { get; set; }

        public string VerficationToken { get; set;} = string.Empty;

        public DateTime VerfiedAt { get; set; }

        public DateTime VTExpiredAt { get; set; }
    }
}
