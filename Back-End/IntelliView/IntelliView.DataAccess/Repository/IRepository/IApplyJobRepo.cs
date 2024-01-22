using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IApplyJobRepo : IRepository<ApplyJob>
    {
        public Task<ApplyJob> Update(ApplyJob applyJob);
    }
}
