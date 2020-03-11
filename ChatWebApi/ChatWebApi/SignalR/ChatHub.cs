using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

		public override Task OnConnectedAsync()
		{
			var httpContext = Context.GetHttpContext();
			var someHeaderValue = Convert.ToInt32(httpContext.Request.Query["UserId"]);
			Groups.AddToGroupAsync(Context.ConnectionId, "1");
			return base.OnConnectedAsync();
		}

		public async Task SendMessageToChat(int userId, int chatId, string message)
		{
			await _mediator.Send(new SendMessageCommand { ChatId = chatId, SenderId = userId, Text = message });
			await Clients.Groups(chatId.ToString()).SendAsync("UpdateChatMessages", chatId, userId, message);
		}

		public async Task GetChatMessages(int chatId)
		{
			var result = await _mediator.Send(new GetChatMessagesQuery { ChatId = chatId });
			await Clients.Caller.SendAsync("GetChatMessages", chatId, result.Messages);
		}
	}
}
