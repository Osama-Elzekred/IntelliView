using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.Utility.Settings
{
    public class AllowedExtenionsAttribute : ValidationAttribute
    {
        private readonly string _allowedExtensions;
        public AllowedExtenionsAttribute(string allowedExtensions)
        {
            _allowedExtensions = allowedExtensions;
        }
        protected override ValidationResult? IsValid
            (object? value, ValidationContext validationContext)
        {
            if (value == null)
            {
                return ValidationResult.Success;
            }
            var result =validationContext.Items.
                TryGetValue("AllowedExtensions", out object? allowedExtensions);
            var file = value as IFormFile;
            var extension = Path.GetExtension(file.FileName);
            if (!_allowedExtensions.Contains(extension.ToLower()))
            {
                return new ValidationResult($"This file extension is not allowed!");
            }
            return ValidationResult.Success;
        }
    }
}
