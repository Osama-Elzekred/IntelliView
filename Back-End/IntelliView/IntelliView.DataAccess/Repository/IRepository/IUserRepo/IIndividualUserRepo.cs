using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IUserRepo
{
    public interface IIndividualUserRepo : IRepository<IndividualUser>
    {
        void Update(IndividualUser User);
    }
}
