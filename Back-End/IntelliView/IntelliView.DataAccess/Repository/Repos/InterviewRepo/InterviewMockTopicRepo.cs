using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepo
{
    public class InterviewMockTopicRepo : Repository<InterviewMockTopic>, IInterviewMockTopicRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<InterviewMockTopic> _dbSet;
        public InterviewMockTopicRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<InterviewMockTopic>();
        }

        public void Update(InterviewMockTopic IInterviewMockTopic)
        {
            //_db.InterviewSessionQuestion.Update(interviewQuestion);
        }
    }

}
