using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Infrastructure.Entities
{
	public class UserChat
	{
		public int UserId { get; set; }
		public User User { get; set; }

		public int ChatId { get; set; }
		public Chat Chat { get; set; }

		public UserChat(User _user, Chat _chat)
		{
			User = _user;
			Chat = _chat;
		}

		private UserChat() { }
	}
}
