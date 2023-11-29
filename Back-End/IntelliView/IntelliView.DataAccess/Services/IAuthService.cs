using IntelliView.Models.DTO;

namespace IntelliView.API.Services
{
    public interface IAuthService
    {
        string GenerateTokenString(LoginDTO user);
        Task<bool> Login(LoginDTO user);
        Task<bool> RegisterUser(RegisterDTO user);
        Task<List<string>> GetRolesByEmailAsync(string userEmail);
    }
}