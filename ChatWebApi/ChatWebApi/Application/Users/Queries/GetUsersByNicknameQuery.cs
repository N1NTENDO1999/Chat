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
	public class GetUsersByNicknameQuery : IRequest<GetUsersByNicknameQueryResult>
	{
		public string Nickname { get; set; }
	}

	public class GetUsersByNicknameQueryResult
	{
		public List<UserDTO> Users { get; set; }
	}

	public class GetUsersByNicknameQueryHandler : IRequestHandler<GetUsersByNicknameQuery, GetUsersByNicknameQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetUsersByNicknameQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetUsersByNicknameQueryResult> Handle(GetUsersByNicknameQuery request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(request.Nickname)) 
				throw new ArgumentNullException("Nickname is empty", nameof(request));

			var users = await _db.Users.Where(p => p.Nickname.Contains(request.Nickname, StringComparison.InvariantCultureIgnoreCase))
				.Select(p => _mapper.Map<UserDTO>(p))
				.ToListAsync();

			return new GetUsersByNicknameQueryResult { Users = users };
		}
	}
}
