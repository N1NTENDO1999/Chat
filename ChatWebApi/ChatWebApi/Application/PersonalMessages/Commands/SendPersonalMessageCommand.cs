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

namespace ChatWebApi.Application.PersonalMessages.Commands
{
	public class SendPersonalMessageCommand : IRequest<CommandResult>
	{
		public int ReceiverId { get; set; }
		public int SenderId { get; set; }
		public string Text { get; set; }
	}

	public class SendPersonalMessageCommandHandler : IRequestHandler<SendPersonalMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public SendPersonalMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(SendPersonalMessageCommand request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(request.Text))
				throw new ArgumentNullException("No Text In Message", nameof(request));

			var receiver = await _db.Users.FirstAsync(p => p.Id == request.ReceiverId);
			var sender = await _db.Users.FirstAsync(p => p.Id == request.SenderId);

			var message = new PersonalMessage { Receiver = receiver, Sender = sender, Text = request.Text, DateCreated = DateTime.UtcNow };
			await _db.PersonalMessages.AddAsync(message);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
