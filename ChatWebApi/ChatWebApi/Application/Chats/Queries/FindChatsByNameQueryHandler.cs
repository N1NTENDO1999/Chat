using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class FindChatsByNameQuery : IRequest<FindChatsByNameResult>
	{
		public string Name { get; set; }
	}

	public class FindChatsByNameResult
	{
		public IEnumerable<ChatDTO> Chats { get; set; }

		public FindChatsByNameResult(IEnumerable<ChatDTO> chats)
		{
			Chats = chats;
		}
	}

	public class FindChatsByNameQueryHandler : IRequestHandler<FindChatsByNameQuery, FindChatsByNameResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public FindChatsByNameQueryHandler(ChatContext context, IMapper mapper)
		{
			_db = context ?? throw new ArgumentNullException(nameof(context));
			_mapper = mapper ?? throw new ArgumentNullException(nameof(_mapper));
		}

		public async Task<FindChatsByNameResult> Handle(FindChatsByNameQuery request, CancellationToken cancellationToken)
		{
			if (request == null)
				throw new ArgumentNullException(nameof(request),
												"Command can not be null.");

			var chats = await _db.Chats
				.Where(p => p.Name.Contains(request.Name, StringComparison.InvariantCultureIgnoreCase) & !p.IsPrivate)
				.ToListAsync();

			var chatsDto = _mapper.Map<List<ChatDTO>>(chats);

			return new FindChatsByNameResult(chatsDto);
		}
	}
}
