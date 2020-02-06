using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Queries
{
	public class FindChatsByNameQuery : IQuery<FindChatsByNameResult>
	{
		public string Name { get; set; }
	}

	public class FindChatsByNameResult : IQueryResult
	{
		public IEnumerable<Chat> Chats { get; set; }

		public FindChatsByNameResult(IEnumerable<Chat> chats)
		{
			Chats = chats;
		}
	}
}
