using IntelliView.Models.DTO;
using Microsoft.AspNetCore.Identity;
using static System.Net.WebRequestMethods;

namespace IntelliView.Models.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string ImageURl { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";
        public List<RefreshToken>? RefreshTokens { get; set; }

        // verfication
        public String VerificationToken { get; set; } = string.Empty;
        public DateTime VerifyExpiredAt { get; set; } = DateTime.UtcNow;
        public DateTime VerfiedAt { get; set; } = DateTime.UtcNow;
        public bool Verified { get; set; } = false;

        // reset password
        public string ResetPassToken { get; set; } = string.Empty;
        public DateTime? ResetPassExpiredAt { get; set; } = DateTime.UtcNow;
        public DateTime? PassChangedAt { get; set; } = DateTime.UtcNow;

    }
}
