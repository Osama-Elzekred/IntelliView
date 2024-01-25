using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace IntelliView.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImageURl { get; set; } = string.Empty;
        public List<RefreshToken>? RefreshTokens { get; set; }

        // verfication
        public String VerificationToken { get; set; } = string.Empty;
        public DateTime VerifyExpiredAt { get; set; }
        public DateTime VerfiedAt { get; set; }
        public bool Verified { get; set; } = false;

        // reset password
        public string? ResetPassToken { get; set; }
        public DateTime ResetPassExpiredAt { get; set; }
        public DateTime PassChangedAt { get; set; }

    }
}
