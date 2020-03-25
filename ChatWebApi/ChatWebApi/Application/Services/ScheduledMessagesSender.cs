using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Application.ScheduledMessages.Queries;
using ChatWebApi.Infrastructure;
using ChatWebApi.SignalR;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;

namespace ChatWebApi.Application.Services
{
	public class ScheduledMessagesSender : BackgroundService
	{
		private readonly IMediator _mediator;
		private readonly IHubContext<ChatHub> _hub;
		private readonly object balanceLock = new object();
		public ScheduledMessagesSender(IMediator mediator, IHubContext<ChatHub> hubContext)
		{
			_mediator = mediator;
			_hub = hubContext;
		}

		protected async override Task ExecuteAsync(CancellationToken stoppingToken)
		{
			while (!stoppingToken.IsCancellationRequested)
			{
				lock (balanceLock)
				{
					var message = _mediator.Send(new GetTopByDeliverMessageQuery()).Result;
				}
				await _hub.Clients.All.SendAsync("Msq", "KKK");
				await Task.Delay(5000);
			}
		}
	}
}
