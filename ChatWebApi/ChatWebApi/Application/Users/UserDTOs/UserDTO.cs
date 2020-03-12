using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Application.Users.Queries.UserDTOs
{
	public class UserDTO
	{
        public int Id { get; set; }
        public string Picture { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ActiveDateTime { get; set; }

    }
}
