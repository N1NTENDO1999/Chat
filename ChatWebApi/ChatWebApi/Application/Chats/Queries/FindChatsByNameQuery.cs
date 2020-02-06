using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Queries
{
	public class FindChatsByNameQuery : IQuery<IEnumerable<Chat>>
	{
		public string Name { get; set; }
	}
}
