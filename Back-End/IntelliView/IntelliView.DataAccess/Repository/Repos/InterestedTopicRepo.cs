using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;

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
