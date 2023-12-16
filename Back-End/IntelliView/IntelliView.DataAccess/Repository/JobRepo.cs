using AutoMapper;
using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
namespace IntelliView.DataAccess.Repository
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

            Job? jp = await _db.jops.FindAsync(job.Id);
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
    }
}
