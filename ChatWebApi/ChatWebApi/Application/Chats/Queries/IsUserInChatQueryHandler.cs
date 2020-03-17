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
	public class IsUserInChatQuery : IRequest<bool>
	{
		public int UserId { get; set; }
		public int ChatId { get; set; }
	}

	public class IsUserInChatQueryHandler : IRequestHandler<IsUserInChatQuery, bool>
	{
		private readonly ChatContext _db;

		public IsUserInChatQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<bool> Handle(IsUserInChatQuery request, CancellationToken cancellationToken)
		{
			var result = await _db.UserChats.FirstOrDefaultAsync(p => p.ChatId == request.ChatId & p.UserId == request.UserId);
			if (result == null)
			{
				return false;
			}
			return true;
		}
	}
}
