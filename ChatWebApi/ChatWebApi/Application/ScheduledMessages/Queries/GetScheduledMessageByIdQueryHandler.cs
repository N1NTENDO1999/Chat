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

	public class GetScheduledMessageByIdQuery : IRequest<ScheduledMessageDTO> 
	{
		public int Id { get; set; }
	}

	public class GetScheduledMessageByIdQueryHandler : IRequestHandler<GetScheduledMessageByIdQuery, ScheduledMessageDTO>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetScheduledMessageByIdQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<ScheduledMessageDTO> Handle(GetScheduledMessageByIdQuery request, CancellationToken cancellationToken)
		{
			var message = await _db.ScheduledMessages.FirstAsync(p => p.Id == request.Id);
			var result = _mapper.Map<ScheduledMessageDTO>(message);

			return result;
		}
	}
}
