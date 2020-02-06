using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetAllUsersQueryHandler : IQueryHandler<GetAllUsersQuery, UsersQueryResult>
	{
		private ChatContext _db;

		public GetAllUsersQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<UsersQueryResult> Handle(GetAllUsersQuery request)
		{
			var users = await _db.Users.Select(p => new UserDTO
			{
				ActiveDateTime = p.ActiveDateTime,
				DateCreated = p.DateCreated,
				Email = p.Email,
				FirstName = p.FirstName,
				Id = p.Id,
				LastName = p.LastName,
				Nickname = p.Nickname
			}).ToListAsync();

			return new UsersQueryResult { Users = users };
		}
	}
}
