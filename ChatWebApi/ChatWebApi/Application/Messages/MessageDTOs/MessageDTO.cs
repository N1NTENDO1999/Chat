using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;

namespace ChatWebApi.Application.Messages.MessageDTOs
{
	public class MessageDTO
	{
		public int Id { get; set; }
		public DateTime DateCreated { get; set; }
		public string Text { get; set; }
		public bool IsRead { get; set; }

		public int SenderId { get; set; }
		public UserDTO Sender { get; set; }
	}
}
