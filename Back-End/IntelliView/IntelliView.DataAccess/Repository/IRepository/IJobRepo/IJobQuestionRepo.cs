using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IJobRepos
{
    public interface IJobQuestionRepo : IRepository<JobQuestion>
    {
        public Task<JobQuestion> Update(JobQuestion job);
        Task<IEnumerable<JobQuestion>> GetJobQuestionsAsync(int jobId);
        public Task AddQuestionToJob(int jobId, JobQuestion question);
    }
}
