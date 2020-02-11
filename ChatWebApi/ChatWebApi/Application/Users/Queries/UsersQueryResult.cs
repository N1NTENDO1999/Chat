using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Users.Queries
{
	public class UsersQueryResult : IQueryResult
	{
		public IEnumerable<UserDTO> Users{ get; set; }

	}
}
