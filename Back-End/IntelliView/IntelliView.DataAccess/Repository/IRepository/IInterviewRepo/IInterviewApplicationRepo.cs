using IntelliView.DataAccess.Repository.Repos.InterviewRepos;
using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository.IRepository.InterviewRepos
{
    public interface IInterviewApplicationRepo : IRepository<InterviewApplicationRepo>
    {

        void Update(InterviewApplicationRepo interviewApplication);
    }
}
