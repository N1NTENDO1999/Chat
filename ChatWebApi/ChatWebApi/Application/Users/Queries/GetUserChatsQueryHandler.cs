using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
		public List<int> ChatsId { get; set; }
	}

	public class GetUserChatsQueryHandler : IRequestHandler<GetUserChatsQuery, GetUserChatsQueryResult>
	{
		private readonly ChatContext _db;

		public GetUserChatsQueryHandler(ChatContext context)
		{
			_db = context;
		}
		public async Task<GetUserChatsQueryResult> Handle(GetUserChatsQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.Include(p => p.UserChats).FirstAsync(p => p.Id == request.Id);
			var chats = user.UserChats.Select(p => p.ChatId).ToList();

			return new GetUserChatsQueryResult { ChatsId = chats };
		}
	}
}
