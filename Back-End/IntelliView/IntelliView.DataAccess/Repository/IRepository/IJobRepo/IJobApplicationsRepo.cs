using IntelliView.Models.DTO;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IJobRepos
{
    public interface IJobApplicationsRepo : IRepository<JobApplication>
    {
        //Task<JobApplication?> GetUserApplicationAsync(int jobId, string userId);

        Task<IEnumerable<JobApplication>> GetUserApplicationsByUserIdAsync(string userId);

        Task<IEnumerable<JobApplication>> GetApplicationsByJobIdAsync(int jobId);
        Task<JobApplication> GetApplicationWithAnswersByIdAsync(int jobId, string userId);

        void Update(JobApplication userApplication);

        Task RemoveUserApplicationAsync(int jobId, string userId);
        Task<IEnumerable<GetAppliedJobsDTO>> GetAppliedJobsAsync(string userId);
        Task<JobApplication> GetApplicationByIdAsync(int jobId, string userId);
        Task<IEnumerable<JobApplicationDto>> GetJobApplications(int jobId);


    }

}