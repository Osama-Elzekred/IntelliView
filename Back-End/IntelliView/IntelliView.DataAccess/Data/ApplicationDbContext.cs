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
        public DbSet<JobQuestion> JobQuestions { get; set; }
        public DbSet<JobApplication> JobApplications { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        //override protected void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<JobApplication>()
        //        .HasKey(ja => new { ja.JobId, ja.UserId });
                

        //    modelBuilder.Entity<UserJobAnswer>()
        //        .HasOne(uja => uja.UserApplication)
        //        .WithMany(ua => ua.UserAnswers)
        //        .HasForeignKey(uja => new { uja.JobId, uja.UserId })
        //        .OnDelete(DeleteBehavior.NoAction);


        //}
    }
}
