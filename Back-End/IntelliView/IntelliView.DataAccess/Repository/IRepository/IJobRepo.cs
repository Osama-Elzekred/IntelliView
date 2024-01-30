using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IJobRepo : IRepository<Job>
    {
        public Task<Job> Update(Job job);
        public Task AddQuestionToJob(int jobId, JobQuestion question);
    }
}
