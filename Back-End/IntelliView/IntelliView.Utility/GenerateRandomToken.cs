using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Utility
{
    public class GenerateRandomToken
    {
        public static string createRandomToken()
        {
            var token = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(token);
            return Convert.ToBase64String(token);
        }
    }
}
