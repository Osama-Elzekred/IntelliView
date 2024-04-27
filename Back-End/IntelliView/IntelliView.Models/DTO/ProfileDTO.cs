using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class ProfileDTO
    {
        public bool IsCompany { get; set; }
        public string CompanyName { get; set; } = string.Empty;
        public string CompanyWebsite { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string ImageURl { get; set; } = "https://res.cloudinary.com/djvcgnkbn/image/upload/v1714246729/qcicrkq2tjflesksdsat.jpg";
        public string CVURL { get; set; } = string.Empty;
        public string CompanyOverview { get; set; } = string.Empty;
        public string CompanySize { get; set; } = string.Empty;
        public string CompanyType { get; set; } = string.Empty;
        public string CompanyFounded { get; set; } = string.Empty;
        public string CompanySpecialties { get; set; } = string.Empty;

    }
}
