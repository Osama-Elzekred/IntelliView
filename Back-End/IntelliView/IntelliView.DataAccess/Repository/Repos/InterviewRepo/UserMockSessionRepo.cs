using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.Models.Models.Interview;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

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
        public async Task<UserMockSession?> GetUserMockSessionAsync(int id)
        {
            return await _dbSet
                .Include(ums => ums.Answers).ThenInclude(ans => ans.InterviewQuestion)
                .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores).ThenInclude(ums => ums.EmotionScores)
                .SingleOrDefaultAsync(ums => ums.Id == id);
            //return await _db.UserMockSessions.FindAsync(userId, mockId);
        }
        // get all user mock session by user id and mock id
        public async Task<ICollection<UserMockSession>> GetUserMockSessionsAsync(string userId, int mockId)
        {
            return await _dbSet
                //.Include(ums => ums.Answers).ThenInclude(ans => ans.InterviewQuestion)
                .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores)
                .Where(ums => ums.UserId == userId && ums.MockId == mockId).AsNoTracking().ToListAsync();
        }
        // get all sessions by mock id  
        public async Task<IEnumerable<UserMockSession>> GetSessionsAsync(int mockId)
        {
            return await _dbSet
                .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores)
                .Where(ums => ums.MockId == mockId).AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<UserMockSession>> GetSessionsWithJobApplicationAsync(int mockId)
        {
            return await _dbSet
                .Include(ums => ums.UserApplication).ThenInclude(ua => ua.User)
                .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores)
                .Where(ums => ums.MockId == mockId).AsNoTracking().ToListAsync();
        }
        //get all user for one mock
        //public async Task<IEnumerable<UserMockSession>> GetAllUserMockSessionAsync(int mockId)
        //{
        //    return await _dbSet
        //        .Include(ums => ums.Answers).ThenInclude(ums => ums.AnswerAiEvaluationScores)
        //        .Where(ums => ums.MockId == mockId).ToListAsync();
        //}

        // get AppliedMocks with interviewMocks
        public async Task<IEnumerable<UserMockSession>> GetUserMocksWithMock(Expression<Func<UserMockSession, bool>> filter)
        {

            return await _dbSet.Include(Um => Um.InterviewMock).Where(filter).AsNoTracking().ToListAsync();
        }
    }
}