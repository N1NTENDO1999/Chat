using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Chats.ChatDTOs;

namespace ChatWebApi.Application.Messages.MessageDTOs
{
	public class ChatMessageDTO
	{
		public int Id { get; set; }
		public DateTime DateCreated { get; set; }
		public string Text { get; set; }

		public int ChatId { get; set; }
		public ChatProfileDTO Chat { get; set; }
	}
}
