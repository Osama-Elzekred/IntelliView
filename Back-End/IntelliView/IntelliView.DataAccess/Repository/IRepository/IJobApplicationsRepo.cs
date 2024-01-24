using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IJobApplicationsRepo : IRepository<JobApplication>
    {
        //Task<JobApplication?> GetUserApplicationAsync(int jobId, string userId);

        Task<IEnumerable<JobApplication>> GetUserApplicationsByUserIdAsync(string userId);

        Task<IEnumerable<JobApplication>> GetApplicationsByJobIdAsync(int jobId);

        void UpdateUserApplicationAsync(JobApplication userApplication);

        Task RemoveUserApplicationAsync(int jobId, string userId);
    }

}