using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

		public GetAllChatsQueryHandler(ChatContext context)
		{
			_db = context;
		}

		public async Task<FindChatsByNameResult> Handle(GetAllChatsQuery request)
		{
			var result = await _db.Chats.ToListAsync();

			//TODO: Include chat members

			return new FindChatsByNameResult(result);
		}
	}
}
