using BookApp.DAL.DataService;
using BookApp.Filter;
using BookApp.Models;
using BookApp.Response;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace BookApp.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private AuthService _repo = null;

        public AccountController()
        {
            _repo = new AuthService();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserModel userModel)
        {
            try
            {

                IdentityResult result = await _repo.RegisterUser(userModel);

                IHttpActionResult errorResult = GetErrorResult(result);
                if (!ModelState.IsValid)
                { 
                    errorResult = GetErrorResult(result);
                }
               

                if (errorResult != null)
                {
                    return errorResult;
                }

                return Ok(true);
            }
            catch
            {
                return BadRequest();
            }
          
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
               return new ResponseResult(result.Errors, false);
            }

            return null;
        }
    }
}
