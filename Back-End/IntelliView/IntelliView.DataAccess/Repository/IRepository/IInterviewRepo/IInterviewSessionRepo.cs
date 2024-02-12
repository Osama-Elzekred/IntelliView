using IntelliView.DataAccess.Repository.Repos.InterviewRepo;
using IntelliView.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntelliView.DataAccess.Repository.IRepository.InterviewRepo
{
    public interface IInterviewSessionRepo : IRepository<InterviewSessionRepo>
    {

        void Update(InterviewSessionRepo interviewSession);
    }
}
