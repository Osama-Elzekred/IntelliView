using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace IntelliView.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImageURl { get; set; } = string.Empty;
        public List<RefreshToken>? RefreshTokens { get; set; }

        public String VerificationToken { get; set; } = string.Empty;
        public DateTime VerfiedAt { get; set; }

        public string? PWResetToken { get; set; }
        public DateTime VTExpiredAt { get; set; }

    }
}
