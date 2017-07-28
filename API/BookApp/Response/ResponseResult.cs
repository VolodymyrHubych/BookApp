using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace BookApp.Response
{
    public class ResponseResult : IHttpActionResult
    {
        private object data;

        public ResponseResult(object data, bool success)
        {
            this.data = new { body = data, success = success};
            
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(new JavaScriptSerializer().Serialize(data));
            return Task.FromResult(response);
        }
    }
}