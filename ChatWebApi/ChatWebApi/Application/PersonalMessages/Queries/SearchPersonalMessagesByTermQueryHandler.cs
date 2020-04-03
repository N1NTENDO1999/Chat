using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.PersonalMessages.PersonalMessagesDTOs;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.PersonalMessages.Queries
{
	public class SearchPersonalMessagesByTermQuery : IRequest<SearchPersonalMessagesByTermQueryResult>
	{
		public int Id { get; set; }
		public string Term { get; set; }
	}

	public class SearchPersonalMessagesByTermQueryResult
	{
		public List<SearchedPersonalMessageDTO> Messages { get; set; }
	}

	public class SearchPersonalMessagesByTermQueryHandler : IRequestHandler<SearchPersonalMessagesByTermQuery, SearchPersonalMessagesByTermQueryResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public SearchPersonalMessagesByTermQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<SearchPersonalMessagesByTermQueryResult> Handle(SearchPersonalMessagesByTermQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users
				.Include(p => p.PersonalMessagesReceived).ThenInclude(p => p.Sender)
				.Include(p => p.PersonalMessagesSent).ThenInclude(p => p.Receiver)
				.FirstAsync(p => p.Id == request.Id);

			var messagesRec = user.PersonalMessagesReceived.
				Where(p => p.Text.Contains(request.Term, StringComparison.InvariantCultureIgnoreCase))
				.Select(p =>
				{
					var c = _mapper.Map<SearchedPersonalMessageDTO>(p);
					c.Chat = _mapper.Map<UserDTO>(p.Sender);
					return c;
				}).ToList();

			var messagesSent = user.PersonalMessagesSent.
				Where(p => p.Text.Contains(request.Term, StringComparison.InvariantCultureIgnoreCase))
				.Select(p =>
				{
					var c = _mapper.Map<SearchedPersonalMessageDTO>(p);
					c.Chat = _mapper.Map<UserDTO>(p.Receiver);
					return c;
				}).ToList();

			messagesRec.AddRange(messagesSent);
			var result = messagesRec.OrderByDescending(p => p.DateCreated).ToList();

			return new SearchPersonalMessagesByTermQueryResult { Messages = result };

		}
	}
}
