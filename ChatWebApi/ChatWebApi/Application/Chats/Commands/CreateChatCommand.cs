using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Commands
{
	public class CreateChatCommand : ICommand
	{
		public string Name { get; set; }
		public bool IsPrivate { get; set; }
	}
}
