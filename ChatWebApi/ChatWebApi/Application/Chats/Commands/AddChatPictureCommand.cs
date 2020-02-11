using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Chats.Commands
{
	public class AddChatPictureCommand : ICommand
	{
		public int Id { get; set; }
		public string Picture { get; set; }
	}
}
