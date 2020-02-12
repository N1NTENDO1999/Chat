using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetAllChatsQuery : IQuery<FindChatsByNameResult>
	{
	}

	public class GetAllChatsQueryHandler : IQueryHandler<GetAllChatsQuery, FindChatsByNameResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetAllChatsQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context;
			_mapper = mapper;
		}

		public async Task<FindChatsByNameResult> Handle(GetAllChatsQuery request)
		{
			var result = await _db.Chats
				.ToListAsync();

			var chatsDto = _mapper.Map<List<ChatDTO>>(result);

			return new FindChatsByNameResult(chatsDto);
		}
	}
}
