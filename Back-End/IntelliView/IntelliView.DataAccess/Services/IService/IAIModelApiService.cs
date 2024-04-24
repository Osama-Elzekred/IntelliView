using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IAIModelApiService
    {
        Task<object> SendRequestAsync(object dataToSend, string url, string apiKey);
    }
}
