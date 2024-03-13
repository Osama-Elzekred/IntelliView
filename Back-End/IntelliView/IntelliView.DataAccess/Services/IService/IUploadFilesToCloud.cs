using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IUploadFilesToCloud
    {
        Task<string> UploadImage(IFormFile image, string fileName);
        Task<string> UploadFile(IFormFile file,string fileName);
        Task<string> UploadVideo(IFormFile video, string fileName);
    }
}
