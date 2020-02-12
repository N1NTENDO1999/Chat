using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class FindChatsByNameQuery : IQuery<FindChatsByNameResult>
	{
		public string Name { get; set; }
	}

	public class FindChatsByNameResult : IQueryResult
	{
		public IEnumerable<ChatDTO> Chats { get; set; }

		public FindChatsByNameResult(IEnumerable<ChatDTO> chats)
		{
			Chats = chats;
		}
	}

	public class FindChatsByNameQueryHandler : IQueryHandler<FindChatsByNameQuery, FindChatsByNameResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public FindChatsByNameQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context;
			_mapper = mapper;
		}

		public async Task<FindChatsByNameResult> Handle(FindChatsByNameQuery request)
		{
			if (request == null)
				throw new ArgumentNullException(nameof(request),
												"Command can not be null.");

			var chats = await _db.Chats.Where(p => p.Name == request.Name).ToListAsync();

			var chatsDto = _mapper.Map<List<ChatDTO>>(chats);

			return new FindChatsByNameResult(chatsDto);
		}
	}
}
