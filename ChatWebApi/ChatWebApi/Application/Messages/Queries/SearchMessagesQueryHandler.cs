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
	public class SearchMessagesQuery : IRequest<SearchMessagesQueryResult>
	{
		public int UserId { get; set; }
		public string Term { get; set; }
	}

	public class SearchMessagesQueryResult
	{
		public List<ChatMessageDTO> Messages { get; set; }
	}

	public class SearchMessagesQueryHandler : IRequestHandler<SearchMessagesQuery, SearchMessagesQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public SearchMessagesQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<SearchMessagesQueryResult> Handle(SearchMessagesQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.Include(p => p.UserChats).ThenInclude(p => p.Chat).ThenInclude(p => p.Messages).FirstAsync(p => p.Id == request.UserId);
			List<ChatMessageDTO> result = new List<ChatMessageDTO>();
			user.UserChats
				.ForEach(p => result
				.AddRange(_mapper
				.Map<List<ChatMessageDTO>>(p.Chat.Messages
				.Where(x => x.Text
				.Contains(request.Term, StringComparison.InvariantCultureIgnoreCase)))));
		
			return new SearchMessagesQueryResult { Messages = result };
		}
	}
}
