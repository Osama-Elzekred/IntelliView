using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyRepository CompanyRepository { get; }
        void Save();
    }
}
