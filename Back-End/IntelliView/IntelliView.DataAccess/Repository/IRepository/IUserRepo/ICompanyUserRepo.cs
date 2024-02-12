using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IUserRepo
{
    public interface ICompanyUserRepo : IRepository<CompanyUser>
    {
        void Update(CompanyUser company);
    }
}
