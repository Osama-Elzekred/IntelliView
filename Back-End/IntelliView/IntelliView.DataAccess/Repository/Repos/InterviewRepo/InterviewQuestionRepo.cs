using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.InterviewRepos;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepos
{
    public class InterviewQuestionRepo : Repository<InterviewQuestionRepo>, IInterviewQuestionRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<InterviewQuestionRepo> _dbSet;
        public InterviewQuestionRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<InterviewQuestionRepo>();
        }

        public void Update(InterviewQuestionRepo interviewQuestion)
        {
            //_db.InterviewSessionQuestion.Update(interviewQuestion);
        }
    }
}
