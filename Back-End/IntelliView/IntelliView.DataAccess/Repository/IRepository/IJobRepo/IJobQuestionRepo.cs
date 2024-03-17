using IntelliView.Models.Models;
using IntelliView.Models.Models.job;

namespace IntelliView.DataAccess.Repository.IRepository.IJobRepos
{
    public interface IJobQuestionRepo : IRepository<JobQuestion>
    {
        public Task<JobQuestion> Update(JobQuestion job);
        Task<IEnumerable<(int, string)>> GetJobQuestionsAsync(int jobId);
        public Task AddQuestionToJob(int jobId, CustQuestion question);
        public Task RemoveQuestionFromJob(int jobId, int questionId);
    }
}
