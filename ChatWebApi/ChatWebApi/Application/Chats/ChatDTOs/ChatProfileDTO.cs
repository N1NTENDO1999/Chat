using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Application.Chats.ChatDTOs
{
	public class ChatProfileDTO
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Picture { get; set; }
	}
}
