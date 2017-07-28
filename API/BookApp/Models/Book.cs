using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookApp.Models
{
    public class Book
    {
        public int BookId { get; set; }

        [Required]
        public string BookName { get; set; }

        [Required]
        public string Author { get; set; }

        public string Description { get; set; }

        public virtual ICollection<AppUser> AppUsers { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string OwnerId { get; set; }

        [ForeignKey("OwnerId")]
        public virtual AppUser Owner { get; set; }

    }
}