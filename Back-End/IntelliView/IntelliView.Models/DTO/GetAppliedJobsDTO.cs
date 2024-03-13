using IntelliView.Models.Models;
using System.ComponentModel.DataAnnotations;

namespace IntelliView.Models.DTO
{
    public class GetAppliedJobsDTO
    {
        
        public string Status { get; set; } =string.Empty;

        public JobDTO jobDto = new JobDTO(); 

    }
}
