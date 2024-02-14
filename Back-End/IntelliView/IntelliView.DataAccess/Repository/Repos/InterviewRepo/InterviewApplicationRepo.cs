using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.InterviewRepos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository.Repos.InterviewRepos
{
    public class InterviewApplicationRepo : Repository<InterviewApplicationRepo>, IInterviewApplicationRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<InterviewApplicationRepo> _dbSet;
        public InterviewApplicationRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
            _dbSet = _db.Set<InterviewApplicationRepo>();
        }

        public void Update(InterviewApplicationRepo interviewQuestion)
        {
            //_db.InterviewQuestion.Update(interviewQuestion);
        }
    }
}
