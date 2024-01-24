using IntelliView.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InteliView.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<CompanyUser> CompanyUsers { get; set; }
        public DbSet<IndividualUser> IndividualUsers { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<ApplyJob> ApplyJobs { get; set; }
        public DbSet<JobQuestion> JobQuestions { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
