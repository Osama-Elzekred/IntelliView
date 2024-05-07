using IntelliView.Models.Models.Interview;

namespace IntelliView.DataAccess.Repository.IRepository.IInterviewRepo
{
    public interface IUserMockSessionRepo : IRepository<UserMockSession>
    {

        void Update(UserMockSession interviewApplication);
        Task<UserMockSession?> GetUserMockSessionAsync(int id);
        Task<ICollection<UserMockSession>> GetUserMockSessionsAsync(string userId, int mockId);
        Task<IEnumerable<UserMockSession>> GetSessionsAsync(int mockId);
        //Task<IEnumerable<UserMockSession>> GetAllUserMockSessionAsync(int mockId);
    }
}
