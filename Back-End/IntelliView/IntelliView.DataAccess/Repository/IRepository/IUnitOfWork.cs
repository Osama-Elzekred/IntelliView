namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyUserRepo CompanyUser { get; }
        IIndividualUserRepo IndividualUser { get; }
        IInterviewApplicationRepo InterviewApplication { get; }
        IInterviewQuestionRepo InterviewQuestion { get; }
        IInterviewSessionRepo InterviewSession { get; }

        void Save();
    }
}
