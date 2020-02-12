using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetAllUsersQuery : IRequest<UsersQueryResult>
	{
	}

	public class UsersQueryResult
	{
		public IEnumerable<UserDTO> Users { get; set; }

	}

	public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, UsersQueryResult>
	{
		private ChatContext _db;
		private readonly IMapper _mapper;

		public GetAllUsersQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<UsersQueryResult> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
		{
			var users = await _db.Users.ToListAsync();

			var u = _mapper.Map<List<UserDTO>>(users);

			return new UsersQueryResult { Users = u };
		}
	}
}
