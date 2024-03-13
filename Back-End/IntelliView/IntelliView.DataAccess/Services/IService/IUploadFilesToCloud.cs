using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services.IService
{
    internal interface IUploadFilesToCloud
    {
        Task<string> UploadImage(IFormFile image);
        Task<string> UploadFile(IFormFile file);
        Task<string> UploadVideo(IFormFile video);
    }
}
