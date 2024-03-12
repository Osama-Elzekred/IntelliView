using IntelliView.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class GetAppliedJobsDTO
    {
        
        public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;

        public JobDTO jobDto = new JobDTO(); 

    }
}
