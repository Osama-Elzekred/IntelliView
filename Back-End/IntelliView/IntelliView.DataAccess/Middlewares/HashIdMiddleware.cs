using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

public class HashIdMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<HashIdMiddleware> _logger;

    public HashIdMiddleware(RequestDelegate next, ILogger<HashIdMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value;

        // Regular expression to find integer IDs in the URL path
        var regex = new Regex(@"\b\d+\b");

        context.Request.Path = regex.Replace(path, match => HashId(match.Value));

        _logger.LogInformation($"Original Path: {path}, Transformed Path: {context.Request.Path}");

        await _next(context);
    }

    private string HashId(string id)
    {
        using (var sha256 = SHA256.Create())
        {
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(id));
            var hash = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            return hash;
        }
    }
}
