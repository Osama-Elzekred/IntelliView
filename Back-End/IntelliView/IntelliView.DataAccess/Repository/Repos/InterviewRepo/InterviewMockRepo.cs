using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepo
{
    public class InterviewMockRepo : Repository<InterviewMock>, IInterviewMockRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<InterviewMockRepo> _dbSet;
        public InterviewMockRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<InterviewMockRepo>();
        }

        public void Update(InterviewMockRepo InterviewMock)
        {
            //_db.InterviewSessionQuestion.Update(interviewQuestion);
        }
    }
}
