using IntelliView.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InteliView.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        DbSet<CompanyUser> companyUsers { get; set; }
        DbSet<IndividualUser> individualUsers { get; set; }
        DbSet<InterviewQuestion> interviewQuestions { get; set; }
        DbSet<InterviewApplication> interviewApplications { get; set; }
        DbSet<InterviewSession> interviewSessions { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
