using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.Models.Models.Interview;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepo
{
    public class UserMockSessionRepo : Repository<UserMockSession>, IUserMockSessionRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<UserMockSession> _dbSet;
        public UserMockSessionRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<UserMockSession>();
        }

        public void Update(UserMockSession interviewQuestion)
        {
            //_db.InterviewSessionQuestion.Update(interviewQuestion);
        }
        public async Task<UserMockSession?> GetUserMockSessionAsync(int mockId, string userId)
        {
            return await _dbSet
                .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores)
                .SingleOrDefaultAsync(ums => ums.MockId == mockId && ums.UserId == userId);
            //return await _db.UserMockSessions.FindAsync(userId, mockId);
        }

    }
}