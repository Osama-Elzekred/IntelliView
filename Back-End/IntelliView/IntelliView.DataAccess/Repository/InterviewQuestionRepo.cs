﻿using InteliView.DataAccess.Data;
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
    public class InterviewQuestionRepo : Repository<InterviewQuestionRepo>, IInterviewQuestionRepo
    {
        private readonly ApplicationDbContext _db;
        internal new DbSet<InterviewQuestionRepo> _dbSet;
        public InterviewQuestionRepo(ApplicationDbContext db):base(db)
        {
            _db = db;
            this._dbSet = _db.Set<InterviewQuestionRepo>();
        }

        public void Update(InterviewQuestionRepo interviewQuestion)
        {
            //_db.InterviewQuestion.Update(interviewQuestion);
        }
    }
}