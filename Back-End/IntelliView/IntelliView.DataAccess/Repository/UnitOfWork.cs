using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;

namespace IntelliView.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICompanyUserRepo CompanyUsers { get; private set; }
        public IIndividualUserRepo IndividualUsers { get; private set; }
        public IInterviewApplicationRepo InterviewApplications { get; private set; }
        public IInterviewQuestionRepo InterviewQuestions { get; private set; }
        public IInterviewSessionRepo InterviewSessions { get; private set; }
        public IJobRepo Jobs { get; private set; }
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            CompanyUsers = new CompanyUserRepo(_db);
            IndividualUsers = new IndividualUserRepo(_db);
            InterviewApplications = new InterviewApplicationRepo(_db);
            InterviewQuestions = new InterviewQuestionRepo(_db);
            InterviewSessions = new InterviewSessionRepo(_db);
            Jobs = new JobRepo(_db);
        }
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
