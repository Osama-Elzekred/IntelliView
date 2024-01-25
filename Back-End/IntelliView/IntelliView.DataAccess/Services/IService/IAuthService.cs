using IntelliView.Models.DTO;

namespace IntelliView.DataAccess.Services.IService
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterDTO model);
        Task<AuthModel> GetTokenAsync(TokenRequestModel model);
        Task<string> AddRoleAsync(AddRoleModel model);
        Task<AuthModel> RefreshTokenAsync(string token);
        Task<bool> RevokeTokenAsync(string token);

        Task<bool> VerifyEmailAsync(string userId, string token);

    }
}