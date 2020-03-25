using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ChatWebApi.Application.Services
{
	public class SenderHostedService : BackgroundService
	{
		public SenderHostedService(IServiceProvider services)
		{
			Services = services;
		}

		public IServiceProvider Services { get; }

		protected async override Task ExecuteAsync(CancellationToken stoppingToken)
		{
			await DoWork(stoppingToken);
		}

		private async Task DoWork(CancellationToken stoppingToken)
		{
			using (var scope = Services.CreateScope())
			{
				var scopedProcessingService =
					scope.ServiceProvider
						.GetRequiredService<IScheduledMessagesSender>();

				await scopedProcessingService.Send(stoppingToken);
			}
		}

		public override async Task StopAsync(CancellationToken stoppingToken)
		{
			await Task.CompletedTask;
		}
	}
}
