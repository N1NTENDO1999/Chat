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

namespace ChatWebApi.Application.PersonalMessages.Queries
{
	public class GetPersonalMessagesRangeQuery : IRequest<GetPersonalMessagesRangeQueryResult>
	{
		public int SenderId { get; set; }
		public int ReceiverId { get; set; }
		public int MessageId { get; set; }
	}

	public class GetPersonalMessagesRangeQueryResult
	{
		public List<MessageDTO> Messages { get; set; }
	}

	public class GetPersonalMessagesRangeQueryHandler : IRequestHandler<GetPersonalMessagesRangeQuery, GetPersonalMessagesRangeQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetPersonalMessagesRangeQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<GetPersonalMessagesRangeQueryResult> Handle(GetPersonalMessagesRangeQuery request, CancellationToken cancellationToken)
		{
			var messages = await _db.PersonalMessages.Include(p => p.Receiver).Include(p => p.Sender)
				.Where(p => (p.SenderId == request.SenderId & p.ReceiverId == request.ReceiverId) |
						(p.SenderId == request.ReceiverId & p.ReceiverId == request.SenderId)).ToListAsync();

			var count = messages.FindIndex(p => p.Id == request.MessageId);

			var result = _mapper.Map<List<MessageDTO>>(messages.TakeLast(messages.Count - count));

			return new GetPersonalMessagesRangeQueryResult { Messages = result };
		}
	}
}
