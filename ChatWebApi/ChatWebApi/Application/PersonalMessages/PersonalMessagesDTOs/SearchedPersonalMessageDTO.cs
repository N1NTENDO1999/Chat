using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;

namespace ChatWebApi.Application.PersonalMessages.PersonalMessagesDTOs
{
	public class SearchedPersonalMessageDTO
	{

		public int Id { get; set; }
		public DateTime DateCreated { get; set; }
		public string Text { get; set; }

		public int ChatId { get; set; }
		public UserDTO Chat { get; set; }
	}
}
