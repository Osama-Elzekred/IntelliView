using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository
{
    public class CompanyRepository : Repository<Company> ,ICompanyRepository
    {
        private ApplicationDbContext _db;
        public CompanyRepository(ApplicationDbContext db):base(db)
        {
            _db = db;
        }
        public void Update(Company company)
        {
            //_db.Update(company);
            //_db.Company.Update(company);
        }
    }
}
