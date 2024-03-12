using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository.IInterviewRepo
{
    public interface IInterviewMockTopicRepo : IRepository<InterviewMockTopic>
    {
        void Update(InterviewMockTopic IInterviewMockTopic);
    }

}
