 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.ScheduledMessages.ScheduledMessagesDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.ScheduledMessages.Queries
{
	public class GetChatScheduledMessagesQuery : IRequest<GetChatScheduledMessagesQueryResult>
	{
		public int SenderId { get; set; }
	}

	public class GetChatScheduledMessagesQueryResult
	{
		public List<ScheduledMessageDTO> Messages { get; set; }
	}

	public class GetChatScheduledMessagesQueryHandler : IRequestHandler<GetChatScheduledMessagesQuery, GetChatScheduledMessagesQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetChatScheduledMessagesQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetChatScheduledMessagesQueryResult> Handle(GetChatScheduledMessagesQuery request, CancellationToken cancellationToken)
		{
			var messages = await _db.ScheduledMessages
				.Include(p => p.Chat)
				.Where(p => p.SenderId == request.SenderId)
				.ToListAsync();

			var result = _mapper.Map<List<ScheduledMessageDTO>>(messages);
						
			return new GetChatScheduledMessagesQueryResult { Messages = result };
		}
	}
}
