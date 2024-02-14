using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IUserRepo;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.Repos.UserRepos
{
    public class CompanyUserRepo : Repository<CompanyUser>, ICompanyUserRepo
    {
        private ApplicationDbContext _db;
        public CompanyUserRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(CompanyUser company)
        {
        }
    }
}
