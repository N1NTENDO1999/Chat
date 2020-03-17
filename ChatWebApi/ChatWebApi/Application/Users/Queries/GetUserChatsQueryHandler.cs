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
	public class GetUserChatsQuery : IRequest<GetUserChatsQueryResult>
	{
		public int Id { get; set; }
	}

	public class GetUserChatsQueryResult
	{
		public List<ChatDTO> Chats { get; set; }
	}

	public class GetUserChatsQueryHandler : IRequestHandler<GetUserChatsQuery, GetUserChatsQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetUserChatsQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context;
			_mapper = mapper;
		}
		public async Task<GetUserChatsQueryResult> Handle(GetUserChatsQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.Include(p => p.UserChats).ThenInclude(p => p.Chat).FirstAsync(p => p.Id == request.Id);
			var chats = user.UserChats.Select(p => p.Chat).ToList();
			var result = _mapper.Map<List<ChatDTO>>(chats); 

			return new GetUserChatsQueryResult { Chats = result };
		}
	}
}
