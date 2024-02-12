using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository.Repos
{
    public class InterestedTopicRepo : Repository<InterestedTopic>, IInterestedTopicRepo
    {
        private ApplicationDbContext _db;
        public InterestedTopicRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(CompanyUser company)
        {
        }
    }
}
