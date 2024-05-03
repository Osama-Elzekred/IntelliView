using IntelliView.Models.Models.Interview;

namespace IntelliView.DataAccess.Repository.IRepository.IInterviewRepo
{
    public interface IUserMockSessionRepo : IRepository<UserMockSession>
    {

        void Update(UserMockSession interviewApplication);
        Task<UserMockSession?> GetUserMockSessionAsync(int mockId, string userId);
        Task<IEnumerable<UserMockSession>> GetAllUserMockSessionAsync(int mockId);
    }
}
