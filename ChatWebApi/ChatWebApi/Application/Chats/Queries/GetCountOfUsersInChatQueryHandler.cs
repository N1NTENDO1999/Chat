using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetCountOfUsersInChatQuery : IRequest<GetCountOfUsersInChatQueryResult>
	{
		public int ChatId { get; set; }
	}

	public class GetCountOfUsersInChatQueryResult
	{
		public int Count { get; set; }
	}

	public class GetCountOfUsersInChatQueryHandler : IRequestHandler<GetCountOfUsersInChatQuery, GetCountOfUsersInChatQueryResult>
	{
		private readonly ChatContext _db;

		public GetCountOfUsersInChatQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<GetCountOfUsersInChatQueryResult> Handle(GetCountOfUsersInChatQuery request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.Include(p => p.UserChats).FirstAsync(p => p.Id == request.ChatId);

			return new GetCountOfUsersInChatQueryResult { Count = chat.UserChats.Count };
		}
	}
}
