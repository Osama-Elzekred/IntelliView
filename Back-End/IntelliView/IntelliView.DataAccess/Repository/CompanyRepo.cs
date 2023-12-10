using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository
{
    public class CompanyRepo : Repository<CompanyUser>, ICompanyRepo
    {
        private ApplicationDbContext _db;
        public CompanyRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(CompanyUser company)
        {
            //_db.Update(company);
            //_db.Company.Update(company);
        }
    }
}
