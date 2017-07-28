using BookApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Threading.Tasks;

namespace BookApp.DAL.DataService
{
    public class AuthService : IDisposable
    {
        private BookContext _ctx;

        private UserManager<AppUser> _userManager;

        public AuthService()
        {
            _ctx = new BookContext();
            _userManager = new UserManager<AppUser>(new UserStore<AppUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            AppUser user = new AppUser
            {
                UserName = userModel.UserName,
                LastName = userModel.LastName,
                FirstName = userModel.FirstName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<AppUser> FindUser(string userName, string password)
        {
            AppUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}