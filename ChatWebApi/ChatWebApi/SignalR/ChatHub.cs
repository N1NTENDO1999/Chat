using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Messages.Commands;
using ChatWebApi.Application.Messages.Queries;
using ChatWebApi.Application.PersonalMessages.Commands;
using ChatWebApi.Application.PersonalMessages.Queries;
using ChatWebApi.Application.ScheduledMessages.Commands;
using ChatWebApi.Application.ScheduledMessages.Queries;
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
				var connectionString = twoUsersConnectionString(user, userId);
				await Groups.AddToGroupAsync(Context.ConnectionId, connectionString);
			}

			foreach (var chat in chats.Chats)
			{
			    await Groups.AddToGroupAsync(Context.ConnectionId, chat.Id.ToString());
			}

			await base.OnConnectedAsync();
		}

		private string twoUsersConnectionString(int sender, int receiver)
		{
			var min = Math.Min(sender, receiver).ToString();
			var max = Math.Max(sender, receiver).ToString();
			return min + "+" + max;
		}

		public override async Task OnDisconnectedAsync(Exception exception)
		{
			var httpContext = Context.GetHttpContext();
			var userId = Convert.ToInt32(httpContext.Request.Query["UserId"]);
			var chats = await _mediator.Send(new GetUserChatsQuery { Id = userId });
			var usersId = await _mediator.Send(new GetAllUsersIdQuery());

			foreach (var user in usersId)
			{
				var connectionString = twoUsersConnectionString(user, userId);
				await Groups.RemoveFromGroupAsync(Context.ConnectionId, connectionString);
			}

			foreach (var chat in chats.Chats)
			{
			    await Groups.RemoveFromGroupAsync(Context.ConnectionId, chat.Id.ToString());
			}
			await base.OnDisconnectedAsync(exception);
		}

		public async Task AddScheduledMessage(AddScheduledMessageCommand request)
		{
			var success = await _mediator.Send(request);
			var message = await _mediator.Send(new GetScheduledMessageByIdQuery { Id = success.Id });
			await Clients.Caller.SendAsync("AddScheduledMessage", message);
		}

		public async Task SendMessageToChat(int userId, int chatId, string message)
		{
			var result = await _mediator.Send(new SendMessageCommand { ChatId = chatId, SenderId = userId, Text = message });
			var messageResult = await _mediator.Send(new GetChatMessageByIdQuery { Id = result.Id });
			await Clients.Groups(chatId.ToString()).SendAsync("UpdateChatMessages", messageResult.Message, chatId, false);
			await Clients.GroupExcept(chatId.ToString(), Context.ConnectionId)
				.SendAsync("AddUnreadMessage", chatId, false, messageResult.Message.Id);
		}

		public async Task SendPersonalMessage(int senderId, int receiverId, string message)
		{
			var result = await _mediator
				.Send(new SendPersonalMessageCommand { SenderId = senderId, ReceiverId = receiverId, Text = message });
			var personalResult = await _mediator.Send(new GetPersonalMessageByIdQuery { Id = result.Id });
			var connectedString = twoUsersConnectionString(senderId, receiverId);
			await Clients.Groups(connectedString).SendAsync("UpdateChatMessages", personalResult.Message, senderId, true);
			await Clients.GroupExcept(connectedString, Context.ConnectionId)
				.SendAsync("AddUnreadMessage", senderId, true, personalResult.Message.Id);
		}

		public async Task MarkAsReadChat(int chatId, int userId) 
		{
			await _mediator.Send(new MarkMessagesAsReadCommand { ChatId = chatId, UserId = userId });
		}

		public async Task MarkAsReadPersonal(int senderId, int receiverId)
		{
			await _mediator.Send(new MarkAsReadMessageCommand { ReceiverId = receiverId, SenderId = senderId });
		}

		public async Task GetScheduledMessages(int senderId, int receiverId, bool isPersonal)
		{
			var result = await _mediator
				.Send(new GetChatScheduledMessagesQuery { IsPersonal = isPersonal, ReceiverId = receiverId, SenderId = senderId });
			await Clients.Caller.SendAsync("GetScheduledMessages", result.Messages);
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

		public async Task AddToGroup(int group)
		{
			await Groups.AddToGroupAsync(Context.ConnectionId, group.ToString());
		}

		public async Task AddUserToChat(int userId, int chatId) 
		{
			var result = await _mediator.Send(new AddUserToChatCommand { ChatId = chatId, UserId = userId });
			await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
			await Clients.All.SendAsync("AddUserToChat", result, userId);
		}
	}
}
