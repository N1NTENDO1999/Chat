using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application.Messages.Commands;
using ChatWebApi.Application.Messages.Queries;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace ChatWebApi.SignalR
{
	public class ChatHub : Hub
	{
		private readonly IMediator _mediator;

		public ChatHub(IMediator mediator)
		{
			_mediator = mediator;
		}

		public async Task SendMessageToChat(int userId, int chatId, string message)
		{
			await _mediator.Send(new SendMessageCommand { ChatId = chatId, SenderId = userId, Text = message });
			await Clients.All.SendAsync("UpdateChatMessages", chatId, userId, message);
		}

		public async Task GetChatMessages(int chatId)
		{
			var result = await _mediator.Send(new GetChatMessagesQuery { ChatId = chatId });
			await Clients.All.SendAsync("GetChatMessages", chatId, result.Messages);
		}
	}
}
