namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyRepo Company { get; }
        IIndividualUserRepo IndividualUser { get; }
        IInterviewApplicationRepo InterviewApplication { get; }
        IInterviewQuestionRepo InterviewQuestion { get; }
        IInterviewSessionRepo InterviewSession { get; }

        void Save();
    }
}
