using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.ScheduledMessages.Commands
{
	public class AddScheduledMessageCommand : IRequest<CommandResult>
	{
		public int ChatId { get; set; }
		public int SenderId { get; set; }
		public string Text { get; set; }
		public DateTime Delivery { get; set; }
	}

	public class AddScheduledMessageCommandHandler : IRequestHandler<AddScheduledMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public AddScheduledMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(AddScheduledMessageCommand request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(request.Text))
				throw new ArgumentNullException("No Text In Message", nameof(request));

			var chat = await _db.Chats.FirstAsync(p => p.Id == request.ChatId);
			var user = await _db.Users.FirstAsync(p => p.Id == request.SenderId);

			var message = new ScheduledMessage
			{
				Receiver = chat,
				Sender = user,
				Text = request.Text,
				Date = DateTime.UtcNow,
				Delivery = request.Delivery
			};
			await _db.ScheduledMessages.AddAsync(message);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
