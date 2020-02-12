using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;

namespace ChatWebApi.Application.PersonalMessages.PersonalMessageDTOs
{
	public class PersonalMessageDTO
	{
		public int Id { get; set; }
		public DateTime DateCreated { get; set; }
		public string Text { get; set; }
		public bool IsRead { get; set; }

		public int ReceiverId { get; set; }
		public UserDTO Receiver { get; set; }

		public int SenderId { get; set; }
		public UserDTO Sender { get; set; }
	}
}
