using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Infrastructure;
using MediatR;

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

		public Task<SearchMessagesQueryResult> Handle(SearchMessagesQuery request, CancellationToken cancellationToken)
		{
			throw new NotImplementedException();
		}
	}
}
