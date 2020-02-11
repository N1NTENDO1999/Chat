using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Commands
{
	public class ChangeChatCommand : ICommand
	{
		public int Id { get; set; }
		public bool IsPrivate { get; set; }
		public string Name { get; set; }
	}
}
