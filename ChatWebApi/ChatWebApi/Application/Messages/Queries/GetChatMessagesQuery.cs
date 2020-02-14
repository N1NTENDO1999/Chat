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

namespace ChatWebApi.Application.Messages.Queries
{
	public class GetChatMessagesQuery : IRequest<GetChatMessagesQueryResult>
	{
		public int ChatId { get; set; }
	}

	public class GetChatMessagesQueryResult
	{
		public List<MessageDTO> Messages { get; set; }
	}

	public class GetChatMessagesQueryHandler : IRequestHandler<GetChatMessagesQuery, GetChatMessagesQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetChatMessagesQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetChatMessagesQueryResult> Handle(GetChatMessagesQuery request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.Include(p => p.Messages)
				.ThenInclude(p => p.Sender)
				.FirstAsync(p => p.Id == request.ChatId);
			var messages =  _mapper.Map<List<MessageDTO>>(chat.Messages);

			return new GetChatMessagesQueryResult { Messages = messages };
		}
	}
}
