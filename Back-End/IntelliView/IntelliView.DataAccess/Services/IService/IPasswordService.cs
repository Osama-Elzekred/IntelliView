using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IPasswordService 
    {
        Task<bool> CheckEmailAsync(string email);
        Task<string> CreateResetLink(string email);
    }
}
