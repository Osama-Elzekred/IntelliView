using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class RegisterDTO
    {
        [StringLength(50)]
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
