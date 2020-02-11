using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Queries
{
	public class FindChatsByNameQueryHandler : IQueryHandler<FindChatsByNameQuery, FindChatsByNameResult>
	{
		private readonly ChatContext _db;

		public FindChatsByNameQueryHandler(ChatContext context)
		{
			_db = context;
		}

		public async Task<FindChatsByNameResult> Handle(FindChatsByNameQuery request)
		{
			if (request == null)
				throw new ArgumentNullException(nameof(request),
												"Command can not be null.");

			var chats = await _db.Chats.Where(p => p.Name == request.Name).ToListAsync();

			return new FindChatsByNameResult(chats);
		}
	}
}
