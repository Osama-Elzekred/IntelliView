
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;


namespace IntelliView.DataAccess.Middlewares
{

    public class JsonResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public JsonResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Response.OnStarting(state =>
            {
                var httpContext = (HttpContext)state;
                httpContext.Response.Headers.Add("Content-Type", "application/json");
                return Task.CompletedTask;
            }, context);

            await _next(context);
        }
    }

    public static class JsonResponseMiddlewareExtensions
    {
        public static IApplicationBuilder UseJsonResponseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JsonResponseMiddleware>();
        }
    }

}
