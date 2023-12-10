using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface ICompanyRepo : IRepository<CompanyUser>
    {
        void Update(CompanyUser company);
    }
}
