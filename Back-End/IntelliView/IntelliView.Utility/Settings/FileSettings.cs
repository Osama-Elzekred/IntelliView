using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Utility.Settings
{
    public static class FileSettings
    {
        public const string AllowedExtensions = ".jpg,.jpeg,.png";
        public const string AllowedCVExtensions = ".pdf";
        public const int MAxFileSizeInMB = 5;
        public const int MAxFileSizeInBytes = MAxFileSizeInMB * 1024 * 1024;
    }
}
