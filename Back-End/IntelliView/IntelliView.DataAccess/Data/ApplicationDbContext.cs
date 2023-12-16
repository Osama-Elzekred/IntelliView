using IntelliView.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace InteliView.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<CompanyUser> CompanyUsers { get; set; }
        public DbSet<IndividualUser> IndividualUsers { get; set; }
        public DbSet<Job> jops { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
    }
}
