using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface ICompanyUserRepo : IRepository<CompanyUser>
    {
        void Update(CompanyUser company);
    }
}
