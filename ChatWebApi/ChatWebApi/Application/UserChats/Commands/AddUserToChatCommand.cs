using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.UserChats.Commands
{
	public class AddUserToChatCommand : ICommand
	{
		public int UserId { get; set; }
		public int ChatId { get; set; }
	}
}
