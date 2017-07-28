using BookApp.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace BookApp.DAL.DataService
{
    public class BookContext : IdentityDbContext<AppUser>
    {
        public BookContext()
           : base("BookContext")
        {

        }


        public DbSet<Book> Books { get; set; }


        protected override void OnModelCreating(System.Data.Entity.DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
               .HasMany(s => s.Books)
               .WithMany(c => c.AppUsers)
               .Map(cs =>
               {
                   cs.MapLeftKey("UserId");
                   cs.MapRightKey("BookId");
                   cs.ToTable("Orders");
               });

            modelBuilder.Entity<Book>()
                .HasRequired(b => b.Owner)
                .WithMany(u => u.OwnBooks);

            modelBuilder.Entity<IdentityUser>().ToTable("Users").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<AppUser>().ToTable("Users").Property(p => p.Id).HasColumnName("UserId");
            modelBuilder.Entity<IdentityUserRole>().ToTable("UserRoles");
            modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogins");
            modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaims");
            modelBuilder.Entity<IdentityRole>().ToTable("Roles");
        }
    }
}