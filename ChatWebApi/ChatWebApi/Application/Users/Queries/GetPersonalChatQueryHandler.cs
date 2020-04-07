using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetPersonalChatQuery : IRequest<GetPersonalChatQueryResult>
	{
		public int UserId { get; set; }
	}

	public class GetPersonalChatQueryResult
	{
		public ChatDTO Chat { get; set; }
	}

	public class GetPersonalChatQueryHandler : IRequestHandler<GetPersonalChatQuery, GetPersonalChatQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetPersonalChatQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetPersonalChatQueryResult> Handle(GetPersonalChatQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			var result = _mapper.Map<ChatDTO>(user);
			return new GetPersonalChatQueryResult { Chat = result };
		}
	}
}
