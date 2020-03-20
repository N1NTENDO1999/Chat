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
        public string Nickname { get; set; }
    }
}
