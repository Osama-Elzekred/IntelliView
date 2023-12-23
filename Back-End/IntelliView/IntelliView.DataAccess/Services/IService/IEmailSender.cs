using IntelliView.Models.DTO;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage);
    }
}