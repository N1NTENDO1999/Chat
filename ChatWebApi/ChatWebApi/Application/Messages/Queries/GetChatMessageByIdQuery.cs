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
	public class GetChatMessageByIdQuery : IRequest<GetChatMessageByIdQueryResult>
	{
		public int Id { get; set; }
	}

	public class GetChatMessageByIdQueryResult
	{
		public MessageDTO Message { get; set; } 
	}

	public class GetChatMessageByIdQueryHandler : IRequestHandler<GetChatMessageByIdQuery, GetChatMessageByIdQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetChatMessageByIdQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context;
			_mapper = mapper;
		}

		public async Task<GetChatMessageByIdQueryResult> Handle(GetChatMessageByIdQuery request, CancellationToken cancellationToken)
		{
			var message = await _db.Messages.Include(p => p.Sender).FirstAsync(p => p.Id == request.Id);
			var result = _mapper.Map<MessageDTO>(message);
			return new GetChatMessageByIdQueryResult { Message = result };
		}
	}
}
