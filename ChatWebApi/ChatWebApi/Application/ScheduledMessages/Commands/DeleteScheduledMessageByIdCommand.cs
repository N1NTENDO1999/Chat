using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.ScheduledMessages.Commands
{
	public class DeleteScheduledMessageByIdCommand : IRequest<CommandResult>
	{
		public int Id { get; set; }
	}

	public class DeleteScheduledMessageByIdCommandHandler : IRequestHandler<DeleteScheduledMessageByIdCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public DeleteScheduledMessageByIdCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(DeleteScheduledMessageByIdCommand request, CancellationToken cancellationToken)
		{
			var message = await _db.ScheduledMessages.FirstAsync(p => p.Id == request.Id);
			_db.ScheduledMessages.Remove(message);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
