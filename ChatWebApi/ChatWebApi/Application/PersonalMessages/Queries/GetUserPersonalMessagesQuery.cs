using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Application.PersonalMessages.PersonalMessageDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.PersonalMessages.Queries
{
	public class GetUserPersonalMessagesQuery : IRequest<GetUserPersonalMessagesQueryResult>
	{
		public int SenderId { get; set; }
		public int ReceiverId { get; set; }
		public int First { get; set; }
		public int Last { get; set; }
	}

	public class GetUserPersonalMessagesQueryResult
	{
		public List<MessageDTO> Messages { get; set; }
	}

	public class GetUserPersonalMessagesQueryHandler : IRequestHandler<GetUserPersonalMessagesQuery, GetUserPersonalMessagesQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetUserPersonalMessagesQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetUserPersonalMessagesQueryResult> Handle(GetUserPersonalMessagesQuery request, CancellationToken cancellationToken)
		{
			var messages = await _db.PersonalMessages.Include(p => p.Receiver).Include(p => p.Sender)
				.Where(p => (p.SenderId == request.SenderId & p.ReceiverId == request.ReceiverId) |
						(p.SenderId == request.ReceiverId & p.ReceiverId == request.SenderId)).ToListAsync();

			var result = _mapper.Map<List<MessageDTO>>(messages.SkipLast(request.First).TakeLast(request.Last));

			return new GetUserPersonalMessagesQueryResult { Messages = result };

		}
	}
}
