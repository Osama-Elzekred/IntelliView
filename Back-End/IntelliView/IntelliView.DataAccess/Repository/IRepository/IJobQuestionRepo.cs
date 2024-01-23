using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IJobQuestionRepo : IRepository<JobQuestion>
    {
        public Task<JobQuestion> Update(JobQuestion job);
        public Task AddQuestionToJob(int jobId, JobQuestion question);
    }
}
