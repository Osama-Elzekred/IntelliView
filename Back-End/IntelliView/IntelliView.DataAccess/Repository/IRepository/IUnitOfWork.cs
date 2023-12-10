namespace IntelliView.DataAccess.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICompanyRepo CompanyRepo { get; }
        IIndividualUserRepo IndividualUserRepo { get; }
        void Save();
    }
}
