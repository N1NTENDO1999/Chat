using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Queries
{
	public class GetAllChatsQuery : IQuery<FindChatsByNameResult>
	{
	}
}
