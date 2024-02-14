using InteliView.DataAccess.Data;
using IntelliView.DataAccess.Repository.IRepository.IUserRepo;
using IntelliView.Models.Models;

namespace IntelliView.DataAccess.Repository.Repos.UserRepos
{
    public class IndividualUserRepo : Repository<IndividualUser>, IIndividualUserRepo
    {
        private ApplicationDbContext _db;
        public IndividualUserRepo(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(IndividualUser User)
        {

        }
    }
}
