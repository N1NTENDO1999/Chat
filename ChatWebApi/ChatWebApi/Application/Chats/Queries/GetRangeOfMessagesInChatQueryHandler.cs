using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetRangeOfMessagesInChatQuery : IRequest<GetRangeOfMessagesInChatQueryResult>
	{
		public int ChatId { get; set; }
		public int MessageId { get; set; }
	}

	public class GetRangeOfMessagesInChatQueryResult
	{
		public List<MessageDTO> Messages { get; set; }
	}

	public class GetRangeOfMessagesInChatQueryHandler : IRequestHandler<GetRangeOfMessagesInChatQuery, GetRangeOfMessagesInChatQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetRangeOfMessagesInChatQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetRangeOfMessagesInChatQueryResult> Handle(GetRangeOfMessagesInChatQuery request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.Include(p => p.Messages)
				.ThenInclude(p => p.Sender)
				.FirstAsync(p => p.Id == request.ChatId);
			var count = chat.Messages.FindIndex(p => p.Id == request.MessageId);
			var messages = _mapper.Map<List<MessageDTO>>(chat.Messages.TakeLast(chat.Messages.Count - count).ToList());

			return new GetRangeOfMessagesInChatQueryResult { Messages = messages };
		}
	}
}
