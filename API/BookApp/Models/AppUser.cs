using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace BookApp.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Book> OwnBooks { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}