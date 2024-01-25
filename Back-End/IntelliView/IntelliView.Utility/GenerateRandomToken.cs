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
            const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            var random = new Random();
            var token = new char[32];

            for (int i = 0; i < 32; i++)
            {
                token[i] = chars[random.Next(chars.Length)];
            }

            return new string(token);
        }
    }
}
