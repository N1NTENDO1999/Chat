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

		public HashSet<Message> Messages { get; set; }
		public HashSet<ScheduledMessage> ScheduledMessages { get; set; }
		public HashSet<UserChat> UserChats { get; set; }
	}
}
