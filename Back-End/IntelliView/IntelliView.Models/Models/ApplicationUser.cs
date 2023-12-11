using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace IntelliView.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImageURl { get; set; } = string.Empty;
        public List<RefreshToken>? RefreshTokens { get; set; }
    }
}
