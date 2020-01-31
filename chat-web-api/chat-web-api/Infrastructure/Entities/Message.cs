using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Infrastructure.Entities
{
	public class Message
	{
		public int Id { get; set; }
		public DateTime DateCreated { get; set; }
		public string Text { get; set; }
		public bool IsRead { get; set; }

		public int ChatId { get; set; }
		public Chat Chat { get; set; }

		public int SenderId { get; set; }
		public User Sender { get; set; }

	}
}
