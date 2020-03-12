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

namespace ChatWebApi.Application.Messages.Commands
{
	public class SendMessageCommand : IRequest<CommandCreateResult>
	{
		public int ChatId { get; set; }
		public int SenderId { get; set; }
		public string Text { get; set; }
	}

	public class SendMessageCommandHandler : IRequestHandler<SendMessageCommand, CommandCreateResult>
	{
		private readonly ChatContext _db;

		public SendMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandCreateResult> Handle(SendMessageCommand request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(request.Text))
				throw new ArgumentNullException("No Text In Message", nameof(request));

			var chat = await _db.Chats.FirstAsync(p => p.Id == request.ChatId);
			var user = await _db.Users.FirstAsync(p => p.Id == request.SenderId);

			var message = new Message { Chat = chat, Sender = user, Text = request.Text, DateCreated = DateTime.UtcNow };
			await _db.Messages.AddAsync(message);
			await _db.SaveChangesAsync();

			return new CommandCreateResult(message.Id);
		}
	}
}
