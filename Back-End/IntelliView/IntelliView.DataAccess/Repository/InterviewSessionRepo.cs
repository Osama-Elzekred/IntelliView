using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository
{
    public class InterviewSessionRepo : Repository<InterviewSessionRepo>, IInterviewSessionRepo
    {
        private readonly ApplicationDbContext _db;
        internal DbSet<InterviewSessionRepo> _dbSet;
        public InterviewSessionRepo(ApplicationDbContext db):base(db)
        {
            _db = db;
            this._dbSet = _db.Set<InterviewSessionRepo>();
        }

        public void Update(InterviewSessionRepo interviewSession)
        {
            //_db.InterviewQuestion.Update(interviewQuestion);
        }
    }
}
