using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;

namespace IntelliView.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICompanyRepo CompanyRepo { get; private set; }

        public IIndividualUserRepo IndividualUserRepo { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            CompanyRepo = new CompanyRepo(_db);
            IndividualUserRepo = new IndividualUserRepo(_db);
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
