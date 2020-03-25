using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
		private int executionCount = 0;
		public ScheduledMessagesSender(IMediator mediator, IHubContext<ChatHub> hubContext)
		{
			_mediator = mediator;
			_hub = hubContext;
		}

		public async Task Send(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				executionCount++;
				var message = await _mediator.Send(new GetTopByDeliverMessageQuery());

				await _hub.Clients.All.SendAsync("Msq", message);
				

				await Task.Delay(10000, stoppingToken);
			}
		}
	}
}
