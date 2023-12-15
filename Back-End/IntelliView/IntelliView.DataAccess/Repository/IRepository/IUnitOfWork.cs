namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyUserRepo CompanyUsers { get; }
        IIndividualUserRepo IndividualUsers { get; }
        IInterviewApplicationRepo InterviewApplications { get; }
        IInterviewQuestionRepo InterviewQuestions { get; }
        IInterviewSessionRepo InterviewSessions { get; }
        IJopRepo Jops { get; }
        Task SaveAsync();
    }
}
