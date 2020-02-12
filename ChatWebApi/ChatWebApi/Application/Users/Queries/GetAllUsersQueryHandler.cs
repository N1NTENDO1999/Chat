using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetAllUsersQuery : IQuery<UsersQueryResult>
	{
	}

	public class UsersQueryResult : IQueryResult
	{
		public IEnumerable<UserDTO> Users { get; set; }

	}

	public class GetAllUsersQueryHandler : IQueryHandler<GetAllUsersQuery, UsersQueryResult>
	{
		private ChatContext _db;
		private readonly IMapper _mapper;

		public GetAllUsersQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<UsersQueryResult> Handle(GetAllUsersQuery request)
		{
			var users = await _db.Users.ToListAsync();

			var u = _mapper.Map<List<UserDTO>>(users);

			return new UsersQueryResult { Users = u };
		}
	}
}
