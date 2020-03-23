﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatWebApi.Application.Messages.Commands;
using ChatWebApi.Application.Messages.Queries;
using ChatWebApi.Application.PersonalMessages.Queries;
using ChatWebApi.Application.UserChats.Commands;
using ChatWebApi.Application.Users.Queries;
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

		public override async Task OnConnectedAsync()
		{
			var httpContext = Context.GetHttpContext();
			var userId = Convert.ToInt32(httpContext.Request.Query["UserId"]);
			var chats = await _mediator.Send(new GetUserChatsQuery { Id = userId });
			var usersId = await _mediator.Send(new GetAllUsersIdQuery());

			foreach (var user in usersId)
			{
				var min = Math.Min(user, userId).ToString();
				var max = Math.Max(user, userId).ToString();
				await Groups.AddToGroupAsync(Context.ConnectionId, min + "+" + max);
			}

			foreach (var chat in chats.Chats)
			{
			    await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
			}

			await base.OnConnectedAsync();
		}

		public override async Task OnDisconnectedAsync(Exception exception)
		{
			var httpContext = Context.GetHttpContext();
			var userId = Convert.ToInt32(httpContext.Request.Query["UserId"]);
			var chats = await _mediator.Send(new GetUserChatsQuery { Id = userId });
			foreach (var chat in chats.Chats)
			{
			    await Groups.RemoveFromGroupAsync(Context.ConnectionId, chat.Id.ToString());
			}
			await base.OnDisconnectedAsync(exception);
		}

		public async Task SendMessageToChat(int userId, int chatId, string message)
		{
			var result = await _mediator.Send(new SendMessageCommand { ChatId = chatId, SenderId = userId, Text = message });
			var messageResult = await _mediator.Send(new GetChatMessageByIdQuery { Id = result.Id });
			await Clients.Groups(chatId.ToString()).SendAsync("UpdateChatMessages", messageResult.Message);
		}

		public async Task GetChatMessages(int chatId)
		{
			var result = await _mediator.Send(new GetChatMessagesQuery { ChatId = chatId });
			await Clients.Caller.SendAsync("GetChatMessages", chatId, result.Messages);
		}
		public async Task GetPersonalMessages(int senderId, int userId)
		{
			var result = await _mediator.Send(new GetUserPersonalMessagesQuery { SenderId = senderId, ReceiverId = userId });
			await Clients.Caller.SendAsync("GetChatMessages", senderId, result.Messages);
		}

		public async Task AddUserToChat(int userId, int chatId) 
		{
			var result = await _mediator.Send(new AddUserToChatCommand { ChatId = chatId, UserId = userId });
			await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
		}
	}
}
