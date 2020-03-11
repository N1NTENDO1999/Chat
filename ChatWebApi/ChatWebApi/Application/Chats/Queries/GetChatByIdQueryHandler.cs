using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetChatByIdQuery : IRequest<GetChatByIdQueryResult>
	{
		public int Id { get; set; }
	}

	public class GetChatByIdQueryResult 
	{
		public ChatDTO Chat { get; set; }
	}

	public class GetChatByIdQueryHandler : IRequestHandler<GetChatByIdQuery, GetChatByIdQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetChatByIdQueryHandler(IMapper mapper, ChatContext context)
		{
			_db = context ?? throw new ArgumentNullException(nameof(context));
			_mapper = mapper ?? throw new ArgumentNullException(nameof(_mapper));
		}

		public async Task<GetChatByIdQueryResult> Handle(GetChatByIdQuery request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.Id);

			var result = _mapper.Map<ChatDTO>(chat);

			return new GetChatByIdQueryResult { Chat = result };
		}
	}
}
