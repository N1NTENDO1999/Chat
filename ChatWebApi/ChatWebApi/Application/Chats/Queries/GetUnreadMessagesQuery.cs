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
	public class GetUnreadMessagesQuery : IRequest<GetUnreadMessagesQueryResult>
	{
		public int ChatId { get; set; }
	}

	public class GetUnreadMessagesQueryResult
	{
		public int UnreadMessagesCount { get; set; }
	}

	public class GetUnreadMessagesQueryHandler : IRequestHandler<GetUnreadMessagesQuery, GetUnreadMessagesQueryResult>
	{
		private readonly ChatContext _db;

		public GetUnreadMessagesQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<GetUnreadMessagesQueryResult> Handle(GetUnreadMessagesQuery request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.Include(p => p.Messages).FirstAsync(p => p.Id == request.ChatId);
			var count = chat.Messages.Count(p => !p.IsRead);

			return new GetUnreadMessagesQueryResult { UnreadMessagesCount = count };
		}
	}
}
