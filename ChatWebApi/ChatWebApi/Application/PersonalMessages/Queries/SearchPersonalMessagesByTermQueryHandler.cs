using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.PersonalMessages.PersonalMessagesDTOs;
using ChatWebApi.Infrastructure;
using MediatR;

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

		public Task<SearchPersonalMessagesByTermQueryResult> Handle(SearchPersonalMessagesByTermQuery request, CancellationToken cancellationToken)
		{
			throw new NotImplementedException();
		}
	}
}
