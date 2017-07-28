using BookApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace BookApp.DAL.DataService
{
    public class BookService : IDisposable
    {
        private readonly BookContext _ctx;

        public BookService()
        {
            _ctx = new BookContext();
        }

        public IEnumerable<BookModel> GetAllBooks()
        {
            return _ctx.Books
                .ToList().Select(book => book.ToBookModel());
        }

        public IEnumerable<BookModel> GetAllOrderedBooks(string userId)
        {
            return _ctx.Books
                .ToList()
                .Where(book => book.AppUsers.Any(us => us.Id == userId))
                .Select(book => book.ToBookModel());
        }

        public IEnumerable<BookModel> GetUserBooks(string userId)
        {
            return _ctx.Books.Where(book => book.OwnerId == userId)
                .ToList().Select(book => book.ToBookModel());
        }

        public bool AddBook(BookModel bookModel, string userId)
        {
            Book newItem = bookModel.ToBook(userId);

            newItem = _ctx.Books.Add(newItem);

            _ctx.SaveChanges();

            return newItem != null;
        }

        public bool UpdateBook(BookModel bookModel, string userId)
        {
            var exitingBook = _ctx.Books.Find(bookModel.BookId);

            if (exitingBook.OwnerId != userId) return false;

            if (exitingBook != null)
            {
                _ctx.Entry(exitingBook).CurrentValues.SetValues(bookModel);
                _ctx.SaveChanges();
                return true;
            }
            return false;

        }

        public bool OrderBook(string userId, int bookId)
        {
            var user = _ctx.Users.Find(userId);

            var book = _ctx.Books.Find(bookId);

            if(user != null && book!=null)
            {
                user.Books.Add(book);
                _ctx.SaveChanges();
                return true;
            }
            return false;
        }

        public BookModel GetBook(int bookId)
        {
            return _ctx.Books.FirstOrDefault(book => book.BookId == bookId).ToBookModel();
        }

        public bool DeleteBook(int bookId, string userId)
        {
            Book book = _ctx.Books.Find(bookId);

            if (book.OwnerId != userId) return false;

            if (book != null)
            {
                _ctx.Books.Remove(book);
                _ctx.SaveChanges();
                return true;
            }
            return false;
        }

        public UserStatistics GetStatistics(string userId)
        {
            var userBooks = GetUserBooks(userId).ToList();
            var userOrders = GetAllOrderedBooks(userId).ToList();


            var userCustomers = _ctx.Users
                               .Where(us => us.Books.Any(book => book.OwnerId == userId));

            var stat = new UserStatistics()
            {
                CountOfBooks = userBooks.Count(),
                CountOfOrders = userOrders.Count(),
                CountOfCustomers = userCustomers.Count()
            };
            return stat;
        }

        public bool DeleteOrder(int bookId, string userId)
        {
            var user = _ctx.Users.Find(userId);

            var book = _ctx.Books.Find(bookId);

            if (user != null && book != null)
            {
                user.Books.Remove(book);
                _ctx.SaveChanges();
                return true;
            }
            return false;
        }


        public void Dispose()
        {
            _ctx.Dispose();
        }
    }
}