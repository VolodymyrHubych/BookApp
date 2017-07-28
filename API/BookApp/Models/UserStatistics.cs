using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookApp.Models
{
    public class UserStatistics
    {
        public int CountOfOrders { get; set; }

        public int CountOfBooks { get; set; }

        public int CountOfCustomers { get; set; }
    }
}