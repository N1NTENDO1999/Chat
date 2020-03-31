using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace ChatWebApi.Application.Chats.Queries
{
	public class GetUnreadMessagesQuery : IRequest<GetUnreadMessagesQueryResult>
	{
		public int UserId { get; set; }
		public List<ChatDTO> Chats { get; set; }
	}

		public class GetUnreadMessagesQueryResult
	{
		public List<ChatDTO> Chats { get; set; }
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
			foreach (var chat in request.Chats)
			{
				var count = 0;
				if (chat.Id == request.UserId & chat.IsPersonal)
				{
					chat.UnreadMessagesCount = count;
					continue;
				}

				if (!chat.IsPersonal)
				{
					count = await _db.Messages.CountAsync(p => p.SenderId != request.UserId & !p.IsRead & p.ChatId == chat.Id);
				}
				else
				{
					count = await _db.PersonalMessages.CountAsync( p => p.SenderId == chat.Id & p.ReceiverId == request.UserId & !p.IsRead);
				}

				chat.UnreadMessagesCount = count;
			}

			return new GetUnreadMessagesQueryResult { Chats = request.Chats	};
		}
	}
}
