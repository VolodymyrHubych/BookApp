using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Script.Serialization;

namespace BookApp.Filter
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {

            if (!actionContext.ModelState.IsValid)
            {
                var modelState = actionContext.ModelState.Keys.SelectMany(key => actionContext.ModelState[key].Errors.Select(x => x.ErrorMessage));
                var message = new {body = modelState, success= false};
                actionContext.Response = actionContext.Request.CreateErrorResponse(HttpStatusCode.OK, new JavaScriptSerializer().Serialize( message ));
            }
        }
    }
}