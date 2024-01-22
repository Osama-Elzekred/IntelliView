using AutoMapper;
using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.Models.Models;
namespace IntelliView.DataAccess.Repository
{
    public class ApplyJobRepo : Repository<ApplyJob>, IApplyJobRepo
    {
        private ApplicationDbContext _db;
        public ApplyJobRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public async Task<ApplyJob> Update(ApplyJob applyJob)
        {
            IMapper _mapper = new MapperConfiguration(cfg => cfg.CreateMap<ApplyJob, ApplyJob>()).CreateMapper();

            ApplyJob? jp = await _db.ApplyJobs.FindAsync(applyJob.Id);
            if (jp is null)
            {
                throw new InvalidOperationException("jop not found.");
            }
            _mapper.Map(applyJob, jp);
            return jp;
        }
    }
}
