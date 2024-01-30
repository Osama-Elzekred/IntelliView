using IntelliView.Models.Models;
using IntelliView.Models.Models.job;
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
        public DbSet<MCQOption> MCQOptions { get; set; }
        public DbSet<InterestedTopic> InterestedTopics { get; set; }


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

        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserInterestedTopic>()
                .HasKey(ui => new { ui.UserId, ui.InterestedTopicId });

            modelBuilder.Entity<UserInterestedTopic>()
                .HasOne(ui => ui.IndividualUser)
                .WithMany(u => u.UserInterestedTopics)
                .HasForeignKey(ui => ui.UserId);

            modelBuilder.Entity<UserInterestedTopic>()
                .HasOne(ui => ui.InterestedTopic)
                .WithMany(t => t.UserInterestedTopics)
                .HasForeignKey(ui => ui.InterestedTopicId);
            modelBuilder.Entity<JobInterestedTopic>()
                .HasKey(ji => new { ji.JobId, ji.InterestedTopicId });
            modelBuilder.Entity<JobInterestedTopic>()
                .HasOne(ji => ji.Job)
                .WithMany(j => j.JobInterestedTopics)
                .HasForeignKey(ji => ji.JobId);
            modelBuilder.Entity<JobInterestedTopic>()
                .HasOne(ji => ji.InterestedTopic)
                .WithMany(t => t.JobInterestedTopics)
                .HasForeignKey(ji => ji.InterestedTopicId);
            modelBuilder.Entity<InterestedTopic>()
             .HasData(
                    new InterestedTopic { Id = 1, Topic = "Back-End Development" },
                    new InterestedTopic { Id = 2, Topic = "Front-End Development" },
                    new InterestedTopic { Id = 3, Topic = "Full-Stack Development" },
                    new InterestedTopic { Id = 4, Topic = "Data Science" },
                    new InterestedTopic { Id = 5, Topic = "Mobile App Development" },
                    new InterestedTopic { Id = 6, Topic = "Database Administration" },
                    new InterestedTopic { Id = 7, Topic = "Network Engineering" },
                    new InterestedTopic { Id = 8, Topic = "UI/UX Design" },
                    new InterestedTopic { Id = 9, Topic = "Software Testing" },
                    new InterestedTopic { Id = 10, Topic = "DevOps" },
                    new InterestedTopic { Id = 11, Topic = "Cybersecurity" },
                    new InterestedTopic { Id = 12, Topic = "Cloud Computing" },
                    new InterestedTopic { Id = 13, Topic = "Business Analysis" },
                    new InterestedTopic { Id = 14, Topic = "Project Management" },
                    new InterestedTopic { Id = 15, Topic = "Quality Assurance" },
                    new InterestedTopic { Id = 16, Topic = "Technical Writing" },
                    new InterestedTopic { Id = 17, Topic = "AI/ML Engineering" },
                    new InterestedTopic { Id = 18, Topic = "IT Support" },
                    new InterestedTopic { Id = 19, Topic = "Systems Administration" },
                    new InterestedTopic { Id = 20, Topic = "Embedded Systems" },
                    new InterestedTopic { Id = 21, Topic = "Game Development" },
                    new InterestedTopic { Id = 22, Topic = "Web Design" },
                    new InterestedTopic { Id = 23, Topic = "Product Management" },
                    new InterestedTopic { Id = 24, Topic = "Digital Marketing" },
                    new InterestedTopic { Id = 25, Topic = "Financial Analysis" },
                    new InterestedTopic { Id = 26, Topic = "Human Resources" },
                    new InterestedTopic { Id = 27, Topic = "Sales and Marketing" },
                    new InterestedTopic { Id = 28, Topic = "Healthcare IT" },
                    new InterestedTopic { Id = 29, Topic = "Educational Technology" },
                    new InterestedTopic { Id = 30, Topic = "Content Creation" },
                    new InterestedTopic { Id = 31, Topic = "Graphic Design" },
                    new InterestedTopic { Id = 32, Topic = "Legal Tech" },
                    new InterestedTopic { Id = 33, Topic = "Real Estate Technology" },
                    new InterestedTopic { Id = 34, Topic = "Biotechnology" },
                    new InterestedTopic { Id = 35, Topic = "E-commerce Management" },
                    new InterestedTopic { Id = 36, Topic = "Supply Chain Management" },
                    new InterestedTopic { Id = 37, Topic = "Telecommunications" },
                    new InterestedTopic { Id = 38, Topic = "Manufacturing Engineering" },
                    new InterestedTopic { Id = 39, Topic = "Renewable Energy" },
                    new InterestedTopic { Id = 40, Topic = "Aerospace Engineering" },
                    new InterestedTopic { Id = 41, Topic = "Customer Support" },
                    new InterestedTopic { Id = 42, Topic = "Hospitality Management" },
                    new InterestedTopic { Id = 43, Topic = "Retail Operations" },
                    new InterestedTopic { Id = 44, Topic = "Sports Technology" },
                    new InterestedTopic { Id = 45, Topic = "Social Work" },
                    new InterestedTopic { Id = 46, Topic = "Nonprofit Management" },
                    new InterestedTopic { Id = 47, Topic = "Pharmaceutical Research" },
                    new InterestedTopic { Id = 48, Topic = "Legal Services" },
                    new InterestedTopic { Id = 49, Topic = "Fashion Design" },
                    new InterestedTopic { Id = 50, Topic = "Event Planning" }
            );
        }
    }
}
