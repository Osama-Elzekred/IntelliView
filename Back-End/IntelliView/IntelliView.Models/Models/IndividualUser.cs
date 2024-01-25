using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.Models
{
    public class IndividualUser : ApplicationUser
    {
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
    }
}
