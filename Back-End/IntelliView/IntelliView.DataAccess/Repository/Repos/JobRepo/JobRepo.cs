using AutoMapper;
using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IJobRepo;
using IntelliView.Models.Models;
namespace IntelliView.DataAccess.Repository.Repos.JobRepo
{
    public class JobRepo : Repository<Job>, IJobRepo
    {
        private ApplicationDbContext _db;
        public JobRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<Job> Update(Job job)
        {
            IMapper _mapper = new MapperConfiguration(cfg => cfg.CreateMap<Job, Job>()).CreateMapper();

            Job? jp = await _db.Jobs.FindAsync(job.Id);
            if (jp is null)
            {
                throw new InvalidOperationException("jop not found.");
            }
            _mapper.Map(job, jp);
            return jp;
        }
        //public async Task<Job> UpdateAsync(AddJopDTO jopDTO)
        //{


        //    Job? job = await _db.jops.FindAsync(jopDTO.Id);
        //    if (job is null)
        //    {
        //        throw new InvalidOperationException("job not found.");
        //    }
        //    return job;
        //}


        // Constructor and other methods...

        public async Task AddQuestionToJob(int jobId, JobQuestion question)
        {
            var job = await _db.Jobs.FindAsync(jobId);

            if (job == null)
            {
                // Handle job not found
                return;
            }

            // Associate the question with the job
            job.JobQuestions ??= new List<JobQuestion>();
            job.JobQuestions.Add(question);

            // Save changes to the database
            //await _db.SaveChangesAsync();
        }
    }
}
