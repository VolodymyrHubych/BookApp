using BookApp.DAL.DataService;
using BookApp.Filter;
using BookApp.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BookApp.Controllers
{
    [RoutePrefix("api/Books")]
    [Authorize]
    public class BookController : ApiController
    {     

        private BookService service;

        public BookController()
        {
            service = new BookService();       
        }


        [Route("all")]
        public IHttpActionResult GetAllBooks()
        {
            try
            {
               
                return Ok(service.GetAllBooks());
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }

        }

        [Route("mybooks")]
        public IHttpActionResult GetUserBooks()
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.GetUserBooks(userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [Route("myorders")]
        public IHttpActionResult GetAllOrderedBooks()
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.GetAllOrderedBooks(userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [Route("{bookId}")]
        public IHttpActionResult GetBook(int bookId)
        {
            try
            {
                return Ok(service.GetBook(bookId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("add")]
        [ValidateModel]
        public IHttpActionResult AddBook(BookModel bookModel)
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.AddBook(bookModel, userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
       
        [HttpGet]
        [Route("stat")]
        public IHttpActionResult GetStatistics()
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.GetStatistics(userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }
        [HttpGet]
        [Route("order/{bookId}")]
        public IHttpActionResult OrderBook(int bookId)
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.OrderBook(userId, bookId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }


        [HttpPost]
        [Route("edit")]
        [ValidateModel]
        public IHttpActionResult UpdateBook(BookModel bookModel)
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.UpdateBook(bookModel, userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("delete/{bookId}")]
        public IHttpActionResult DeleteBook(int bookId)
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.DeleteBook(bookId, userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route("removeOrder/{bookId}")]
        public IHttpActionResult DeleteOrder(int bookId)
        {
            try
            {
                var userId = HttpContext.Current.User.Identity.GetUserId();
                return Ok(service.DeleteOrder(bookId, userId));
            }
            catch (Exception ex)
            {

                return InternalServerError(ex);
            }
        }



    }
}
