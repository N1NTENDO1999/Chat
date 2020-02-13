using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetUserQuery : IRequest<GetUserQueryResult>
	{
		public int Id { get; set; }
	}

	public class GetUserQueryResult
	{
		public UserDTO User { get; set; }
	}

	public class GetUserQueryHandler : IRequestHandler<GetUserQuery, GetUserQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetUserQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetUserQueryResult> Handle(GetUserQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.Id);
			var result = _mapper.Map<UserDTO>(user);
			return new GetUserQueryResult { User = result };
		}
	}

}
