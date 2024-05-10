using IntelliView.Models.Models.Interview;
using System.Linq.Expressions;

namespace IntelliView.DataAccess.Repository.IRepository.IInterviewRepo
{
    public interface IUserMockSessionRepo : IRepository<UserMockSession>
    {

        void Update(UserMockSession interviewApplication);
        Task<UserMockSession?> GetUserMockSessionAsync(int id);
        Task<ICollection<UserMockSession>> GetUserMockSessionsAsync(string userId, int mockId);
        Task<IEnumerable<UserMockSession>> GetSessionsAsync(int mockId);
        Task<IEnumerable<UserMockSession>> GetUserMocksWithMock(Expression<Func<UserMockSession, bool>> filter);
        //Task<IEnumerable<UserMockSession>> GetAllUserMockSessionAsync(int mockId);
    }
}
