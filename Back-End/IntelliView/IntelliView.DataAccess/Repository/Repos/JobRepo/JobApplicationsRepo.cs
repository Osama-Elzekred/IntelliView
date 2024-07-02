using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IJobRepos;
using IntelliView.Models.DTO;
using IntelliView.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace IntelliView.DataAccess.Repository.Repos.JobRepos
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
        public async Task<JobApplication> GetApplicationByIdAsync(int jobId, string userId)
        {
            return await _db.JobApplications.FindAsync(jobId, userId);
        }

        public async Task<JobApplication> GetApplicationWithAnswersByIdAsync(int jobId, string userId)
        {
            return await _db.JobApplications
                .Include(ua => ua.UserAnswers)
                .ThenInclude(ua => ua.CustQuestion)
                .SingleOrDefaultAsync(ua => ua.JobId == jobId && ua.UserId == userId);
        }
        //get user applied jobs with its status
        public async Task<IEnumerable<GetAppliedJobsDTO>> GetAppliedJobsAsync(string userId)
        {
            var userApplications = await _db.JobApplications
                .Include(ua => ua.Job)
                .Where(ua => ua.UserId == userId)
                .Select(ua => new GetAppliedJobsDTO
                {
                    jobDto = new JobDTO
                    {
                        Id = ua.Job.Id,
                        Title = ua.Job.Title,
                        ImageURl = ua.Job.ImageURl,
                        JobTime = ua.Job.JobTime,
                        MinimumExperience = ua.Job.MinimumExperience,
                        Requirements = ua.Job.Requirements,
                        Responsibilities = ua.Job.Responsibilities,
                        Benefits = ua.Job.Benefits,
                        companyName = ua.Job.CompanyUser.CompanyName,
                        Notes = ua.Job.Notes,
                        IsActive = ua.Job.IsActive,
                        Description = ua.Job.Description,
                        Location = ua.Job.Location,
                        JobType = ua.Job.JobType,
                        CreatedAt = ua.Job.CreatedAt,
                        UpdatedAt = ua.Job.UpdatedAt,
                        EndedAt = ua.Job.EndedAt,
                    },
                    Status = ua.Status.ToString()
                    //Status= ua.IsApproved==false?ApplicationStatus.Pending.ToString(): ua.IsInterviewApproved==true? ApplicationStatus.Accepted.ToString() : ApplicationStatus.InterviewStage.ToString()
                })
                .ToListAsync();
            return userApplications;
        }
        // get user applied job with its interviewQuestionAnswers
        //public async Task<JobApplication> GetApplicationWithJobQuestionAnswersAsync(int jobId, string userId)
        //{
        //    return await _db.JobApplications
        //        .Include(ua => ua.MockVideoAnswers)
        //        .SingleOrDefaultAsync(ua => ua.JobId == jobId && ua.UserId == userId);

        //}


        //public async Task<JobApplication> GetApplicationWithJobQuestionAnswersAsync(int jobId, string userId)
        //{
        //    return await _db.JobApplications
        //        .Include(ua => ua.UserAnswers)
        //        .Include(ua => ua.Job)
        //        .SingleOrDefaultAsync(ua => ua.JobId == jobId && ua.UserId == userId);
        //}
    }

}
