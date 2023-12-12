using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;

namespace IntelliView.DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICompanyRepo Company { get; private set; }
        public IIndividualUserRepo IndividualUser { get; private set; }
        public IInterviewApplicationRepo InterviewApplication { get; private set; }
        public IInterviewQuestionRepo InterviewQuestion { get; private set; }
        public IInterviewSessionRepo InterviewSession { get; private set; }

        public IIndividualUserRepo IndividualUserRepo { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            Company = new CompanyRepo(_db);
            IndividualUser = new IndividualUserRepo(_db);
            InterviewApplication = new InterviewApplicationRepo(_db);
            InterviewQuestion = new InterviewQuestionRepo(_db);
            InterviewSession = new InterviewSessionRepo(_db);
        }
        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
