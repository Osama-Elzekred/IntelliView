using IntelliView.Models.Models;

namespace IntelliView.API.Services
{
    public interface IAuthService
    {
        string GenerateTokenString(AppUser user);
        Task<bool> Login(AppUser user);
        Task<bool> RegisterUser(AppUser user);
    }
}