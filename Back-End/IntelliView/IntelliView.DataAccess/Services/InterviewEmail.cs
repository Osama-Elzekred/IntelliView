using IntelliView.Models.DTO;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    public class InterviewEmail
    {
        private readonly IConfiguration Configuration;
        public InterviewEmail(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public async Task SendInterviewEmailAsync(EmailDTO req)
        {
            var mailUsername = Configuration.GetSection("EmailUsernamedev").Value;
            var mailFrom = "intelliview@intelliview.com";
            var password = Configuration.GetSection("EmailPassworddev").Value;
            var client = new SmtpClient(Configuration.GetSection("EmailHostdev").Value, 587)
            {
                Credentials = new NetworkCredential(mailUsername, password),
                EnableSsl = true
            };

            await client.SendMailAsync(
                new MailMessage(mailFrom, req.To, req.Subject, req.Body) { IsBodyHtml = true }
            );
        }
        public async Task SendApproveEmailAsync(EmailDTO req)
        {
            var mailUsername = Configuration.GetSection("EmailUsernamedev").Value;
            var mailFrom = "intelliview@intelliview.com";
            var password = Configuration.GetSection("EmailPassworddev").Value;
            var client = new SmtpClient(Configuration.GetSection("EmailHostdev").Value, 587)
            {
                Credentials = new NetworkCredential(mailUsername, password),
                EnableSsl = true
            };

            await client.SendMailAsync(
                new MailMessage(mailFrom, req.To, req.Subject, req.Body) { IsBodyHtml = true }
            );
        }
    }
}
