using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyUserRepo CompanyUsers { get; }
        IIndividualUserRepo IndividualUsers { get; }
        IInterviewApplicationRepo InterviewApplications { get; }
        IInterviewQuestionRepo InterviewQuestions { get; }
        IInterviewSessionRepo InterviewSessions { get; }
        IJobRepo Jobs { get; }
        IApplyJobRepo ApplyJobs { get; }
        Task SaveAsync();
    }
}
