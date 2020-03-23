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
	public class GetPersonalMessageByIdQuery : IRequest<GetPersonalMessageByIdQueryResult>
	{
		public int Id { get; set; }
	}

	public class GetPersonalMessageByIdQueryResult
	{
		public MessageDTO Message { get; set; }
	}

	public class GetPersonalMessageByIdQueryHandler : IRequestHandler<GetPersonalMessageByIdQuery, GetPersonalMessageByIdQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetPersonalMessageByIdQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context;
			_mapper = mapper;
		}

		public async Task<GetPersonalMessageByIdQueryResult> Handle(GetPersonalMessageByIdQuery request, CancellationToken cancellationToken)
		{
			var message = await _db.PersonalMessages.Include(p => p.Sender).FirstAsync(p => p.Id == request.Id);
			var result = _mapper.Map<MessageDTO>(message);
			return new GetPersonalMessageByIdQueryResult { Message = result };
		}
	}
}
