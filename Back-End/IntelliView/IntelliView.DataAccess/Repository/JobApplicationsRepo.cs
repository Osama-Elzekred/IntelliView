using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository
{
    public class JobApplicationsRepo : Repository<JobApplication>, IJobApplicationsRepo
    {
        private readonly ApplicationDbContext _db;
        public JobApplicationsRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        //public async Task<JobApplication?> GetUserApplicationAsync(int JobId, string UserId)
        //{
        //    return await _db.JobApplications
        //        .Include(ua => ua.UserAnswers)
        //         .SingleOrDefaultAsync(ua => ua.JobId == JobId && ua.UserId == UserId);
        //}
        public async Task<IEnumerable<JobApplication>> GetUserApplicationsByUserIdAsync(string userId)
        {
            return await _db.JobApplications
                .Include(ua => ua.UserAnswers)
                               .Where(ua => ua.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<JobApplication>> GetApplicationsByJobIdAsync(int jobId)
        {
            return await _db.JobApplications
                .Include(ua => ua.UserAnswers)
                               .Where(ua => ua.JobId == jobId)
                .ToListAsync();
        }


        public void Update(JobApplication userApplication)
        {
            _db.JobApplications.Update(userApplication);
        }

        public async Task RemoveUserApplicationAsync(int JobId, string UserId)
        {
            var userApplication = await _db.JobApplications.FindAsync(JobId, UserId);
            if (userApplication != null)
            {
                _db.JobApplications.Remove(userApplication);
            }
        }

    }

}
