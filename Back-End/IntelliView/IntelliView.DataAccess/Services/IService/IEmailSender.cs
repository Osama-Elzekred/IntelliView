using IntelliView.Models.DTO;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IEmailSender
    {
        Task SendEmailAsync(EmailDTO req);
    }
}