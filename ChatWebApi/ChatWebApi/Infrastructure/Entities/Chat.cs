using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Infrastructure.Entities
{
	public class Chat
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Picture { get; set; }
		public DateTime DateCreated { get; set; }
		public bool IsPrivate { get; set; }

		public int OwnerId { get; set; }
		public User Owner { get; set; }

		public List<Message> Messages { get; set; }
		public List<ScheduledMessage> ScheduledMessages { get; set; }
		public List<UserChat> UserChats { get; set; }

		public Chat()
		{
			Messages = new List<Message>();
			ScheduledMessages = new List<ScheduledMessage>();
			UserChats = new List<UserChat>();
		}
	}
}
