using IntelliView.DataAccess.Repository.Repos.InterviewRepo;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IInterviewRepo
{
    public interface IInterviewMockRepo : IRepository<InterviewMock>
    {
        void Update(InterviewMockRepo IInterviewMock);
    }
}
