using Azure.Core;
using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.DTO;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration Configuration;
        public EmailSender(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        Task IEmailSender.SendEmailAsync(EmailDTO req)
        {
            var mailUsername = Configuration.GetSection("EmailUsernamedev").Value;
            var mailFrom = "intelliview@intelliview.com";
            var password = Configuration.GetSection("EmailPassworddev").Value;
            var client = new SmtpClient(Configuration.GetSection("EmailHostdev").Value , 587)
            {
                Credentials = new NetworkCredential(mailUsername, password),
                EnableSsl = true
            };
            return client.SendMailAsync(
                               new MailMessage(mailFrom, req.To, req.Subject, req.Body) { IsBodyHtml = true }
                                          );
            
        }
    }
}
