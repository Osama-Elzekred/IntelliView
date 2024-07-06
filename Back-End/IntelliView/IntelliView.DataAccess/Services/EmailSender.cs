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
        private readonly IConfiguration _configuration;
        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }
         public Task SendEmailAsync(EmailDTO req)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");
            var mailUsername = emailSettings["Username"];
            var mailFrom = emailSettings["FromEmail"];
            var password = emailSettings["Password"];
            var host = emailSettings["Host"];
            var port = int.Parse(emailSettings["Port"]!);

            var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(mailUsername, password),
                EnableSsl = true
            };

            var mailMessage = new MailMessage(mailFrom!, req.To, req.Subject, req.Body)
            {
                IsBodyHtml = true
            };

            return client.SendMailAsync(mailMessage);
        }
    }
}
