using IntelliView.Models.Models;
using IntelliView.Models.Models.job;

namespace IntelliView.DataAccess.Repository.IRepository.IJobRepos
{
    public interface IJobRepo : IRepository<Job>
    {
        public Task<Job> Update(Job job);
        public Task AddQuestionToJob(int jobId, CustQuestion question);
    }
}
