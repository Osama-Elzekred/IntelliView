using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models.Interview;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepo
{
    public class MockVideoAnswerRepo : Repository<MockVideoAnswer>, IMockVideoAnswerRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<MockVideoAnswer> _dbSet;
        public MockVideoAnswerRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<MockVideoAnswer>();
        }


    }
}
