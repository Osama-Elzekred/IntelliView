using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IJopRepo : IRepository<Jop>
    {
        void Update(Jop jop);
    }
}
