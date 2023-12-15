using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository
{
    public class JopRepo : Repository<Jop>, IJopRepo
    {
        private ApplicationDbContext _db;
        public JopRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Jop jop)
        {
        }
    }
}
