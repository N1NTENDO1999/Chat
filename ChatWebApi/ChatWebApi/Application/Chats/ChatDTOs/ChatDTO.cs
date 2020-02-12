using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Queries.UserDTOs;

namespace ChatWebApi.Application.Chats.ChatDTOs
{
	public class ChatDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Picture { get; set; }
		public DateTime DateCreated { get; set; }
		public bool IsPrivate { get; set; }

		public List<UserDTO> Users { get; set; }
	}
}
