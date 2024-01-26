using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;

namespace IntelliView.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImageURl { get; set; } = @"wwwroot/Assets/images/7495e58b-b72b-4b87-8c12-c77a69b39cd3.jpg";
        public List<RefreshToken>? RefreshTokens { get; set; }

        // verfication
        public String VerificationToken { get; set; } = string.Empty;
        public DateTime VerifyExpiredAt { get; set; } = DateTime.UtcNow;
        public DateTime VerfiedAt { get; set; }  = DateTime.UtcNow;
        public bool Verified { get; set; } = false;

        // reset password
        public string ResetPassToken { get; set; } = string.Empty;
        public DateTime? ResetPassExpiredAt { get; set; } = DateTime.UtcNow;
        public DateTime? PassChangedAt { get; set; } = DateTime.UtcNow;

    }
}
