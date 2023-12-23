using IntelliView.DataAccess.Services.IService;
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
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var mailUsername = "fb5459f3e8339e";
            var mailFrom = "intelliview@intelliview.com";
            var password = "e00e88351b49cd";
            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 587)
            {
                Credentials = new NetworkCredential(mailUsername, password),
                EnableSsl = true
            };
            return client.SendMailAsync(
                               new MailMessage(mailFrom, email, subject, htmlMessage) { IsBodyHtml = true }
                                          );
            //Console.WriteLine("done");
        }
    }
}
