using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Infrastructure.Entities
{
	public class ScheduledMessage
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public DateTime Delivery { get; set; }
		public string Text { get; set; }
		public bool IsPersonal { get; set; }

		public int ReceiverId { get; set; }
		public Chat Receiver { get; set; }

		public int SenderId { get; set; }
		public User Sender { get; set; }
	}
}
