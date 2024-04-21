using IntelliView.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IInterviewEmail
    {
        Task SendInterviewEmailAsync(EmailDTO req);
    }
}
