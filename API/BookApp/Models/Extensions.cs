using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookApp.Models
{
    public static class Extensions
    {
        public static Book ToBook(this BookModel bookModel, string OwnerId)
        {
            return new Book()
            {
                BookName = bookModel.BookName,
                Author = bookModel.Author,
                Description = bookModel.Description,
                ImageUrl = bookModel.ImageUrl,
                OwnerId = OwnerId
            };
        }

        public static BookModel ToBookModel(this Book book)
        {
            return new BookModel()
            {
                BookName = book.BookName,
                Author = book.Author,
                Description = book.Description,
                BookId = book.BookId,
                ImageUrl = book.ImageUrl

            };
        }

    }
}