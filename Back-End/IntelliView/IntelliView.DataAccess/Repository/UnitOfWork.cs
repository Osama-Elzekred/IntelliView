using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICompanyRepository CompanyRepository {get;private set;}
        public UnitOfWork(ApplicationDbContext db) 
        {
            _db = db;
            CompanyRepository = new CompanyRepository(_db);
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
