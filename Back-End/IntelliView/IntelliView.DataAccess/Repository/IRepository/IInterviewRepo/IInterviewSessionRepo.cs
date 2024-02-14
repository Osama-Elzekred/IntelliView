using IntelliView.DataAccess.Repository.Repos.InterviewRepos;

namespace IntelliView.DataAccess.Repository.IRepository.InterviewRepos
{
    public interface IInterviewSessionRepo : IRepository<InterviewSessionRepo>
    {

        void Update(InterviewSessionRepo interviewSession);
    }
}
