using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IJobRepos
{
    public interface IJobApplicationsRepo : IRepository<JobApplication>
    {
        //Task<JobApplication?> GetUserApplicationAsync(int jobId, string userId);

        Task<IEnumerable<JobApplication>> GetUserApplicationsByUserIdAsync(string userId);

        Task<IEnumerable<JobApplication>> GetApplicationsByJobIdAsync(int jobId);

        void Update(JobApplication userApplication);

        Task RemoveUserApplicationAsync(int jobId, string userId);
    }

}