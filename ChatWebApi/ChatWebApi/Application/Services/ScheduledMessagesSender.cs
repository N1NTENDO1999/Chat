using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Application.Messages.Commands;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Application.Messages.Queries;
using ChatWebApi.Application.PersonalMessages.Commands;
using ChatWebApi.Application.PersonalMessages.Queries;
using ChatWebApi.Application.ScheduledMessages.Commands;
using ChatWebApi.Application.ScheduledMessages.Queries;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces;
using ChatWebApi.SignalR;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;

namespace ChatWebApi.Application.Services
{
	public class ScheduledMessagesSender : IScheduledMessagesSender
	{
		private readonly IMediator _mediator;
		private readonly IHubContext<ChatHub> _hub;
		public ScheduledMessagesSender(IMediator mediator, IHubContext<ChatHub> hubContext)
		{
			_mediator = mediator;
			_hub = hubContext;
		}

		public async Task Send(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				var message = await _mediator.Send(new GetTopByDeliverMessageQuery());
				if (message == null)
				{
					await _hub.Clients.All.SendAsync("Msq", "No More Scheduled Chats");
					await Task.Delay(10000, stoppingToken);
					continue;
				}
				MessageDTO executedMessage = null;
				if (message != null && message.Delivery <= DateTime.Now)
				{
					if (message.IsPersonal)
					{
						var resultId = await _mediator
							.Send(new SendPersonalMessageCommand
							{ ReceiverId = message.ReceiverId, SenderId = message.SenderId, Text = message.Text }
							);

						var resultMessage = await _mediator
							.Send(new GetPersonalMessageByIdQuery { Id = resultId.Id });

						await _mediator.Send(new DeleteScheduledMessageByIdCommand { Id = message.Id });

						executedMessage = resultMessage.Message;

						var min = Math.Min(message.ReceiverId, message.SenderId).ToString();
						var max = Math.Max(message.ReceiverId, message.SenderId).ToString();

						await _hub.Clients.Group(min + "+" + max)
							.SendAsync("UpdateChatMessages", executedMessage, message.ReceiverId, true);
					}
					else
					{
						var resultId = await _mediator
							.Send(new SendMessageCommand
							{ ChatId = message.ReceiverId, SenderId = message.SenderId, Text = message.Text }
							);

						var resultMessage = await _mediator
							.Send(new GetChatMessageByIdQuery { Id = resultId.Id });

						await _mediator.Send(new DeleteScheduledMessageByIdCommand { Id = message.Id });

						executedMessage = resultMessage.Message;

						await _hub.Clients.Group(message.ReceiverId.ToString())
							.SendAsync("UpdateChatMessages", executedMessage, message.ReceiverId, false);
					}
				}
				else
				{
					await Task.Delay(10000, stoppingToken);
				}
			}
		}
	}
}
