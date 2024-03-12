using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository;
using IntelliView.DataAccess.Repository.IRepository.IInterviewRepo;
using IntelliView.DataAccess.Repository.IRepository.IJobRepos;
using IntelliView.DataAccess.Repository.IRepository.InterviewRepos;
using IntelliView.DataAccess.Repository.IRepository.IUserRepo;
using IntelliView.DataAccess.Repository.Repos.InterviewRepo;
using IntelliView.DataAccess.Repository.Repos.InterviewRepos;
using IntelliView.DataAccess.Repository.Repos.JobRepos;
using IntelliView.DataAccess.Repository.Repos.UserRepos;

namespace IntelliView.DataAccess.Repository.Repos
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
        public IJobQuestionRepo JobQuestions { get; private set; }
        public IJobApplicationsRepo JobApplications { get; private set; }
        public IInterestedTopicRepo InterestedTopics { get; private set; }
        public IInterviewMockRepo InterviewMocks { get; private set; }
        public IInterviewMockTopicRepo InterviewMockTopics { get; private set; }
        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            CompanyUsers = new CompanyUserRepo(_db);
            IndividualUsers = new IndividualUserRepo(_db);
            InterviewApplications = new InterviewApplicationRepo(_db);
            InterviewQuestions = new InterviewQuestionRepo(_db);
            InterviewSessions = new InterviewSessionRepo(_db);
            Jobs = new JobRepo(_db);
            JobQuestions = new JobQuestionRepo(_db);
            JobApplications = new JobApplicationsRepo(_db);
            InterestedTopics = new InterestedTopicRepo(_db);
            InterviewMocks = new InterviewMockRepo(_db);
            InterviewMockTopics = new InterviewMockTopicRepo(_db);
        }
        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }
    }
}
