using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookApp.Models
{
    public class BookModel
    {

        public int BookId { get; set; }

        [Required(ErrorMessage = "The {0} is required")]
        [Display(Name  = "Book Name")]
        public string BookName { get; set; }

        [Required(ErrorMessage = "The {0} is required")]
        public string Author { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 10)]
        public string Description { get; set; }

        [Url]
        [Required(ErrorMessage = "The {0} is required")]
        public string ImageUrl { get; set; }
    }
}