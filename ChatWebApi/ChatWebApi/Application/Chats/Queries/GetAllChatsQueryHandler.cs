using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetAllChatsQuery : IRequest<FindChatsByNameResult>
	{
	}

	public class GetAllChatsQueryHandler : IRequestHandler<GetAllChatsQuery, FindChatsByNameResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetAllChatsQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context ?? throw new ArgumentNullException(nameof(context));
			_mapper = mapper ?? throw new ArgumentNullException(nameof(_mapper));
		}

		public async Task<FindChatsByNameResult> Handle(GetAllChatsQuery request, CancellationToken cancellationToken)
		{
			var result = await _db.Chats
				.ToListAsync();

			var chatsDto = _mapper.Map<List<ChatDTO>>(result);

			return new FindChatsByNameResult(chatsDto);
		}
	}
}
