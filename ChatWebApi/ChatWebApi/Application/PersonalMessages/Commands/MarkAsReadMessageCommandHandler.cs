using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace ChatWebApi.Application.PersonalMessages.Commands
{
	public class MarkAsReadMessageCommand : IRequest<CommandResult>
	{
		public int ReceiverId { get; set; }
		public int SenderId { get; set; }
	}
	public class MarkAsReadMessageCommandHandler : IRequestHandler<MarkAsReadMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public MarkAsReadMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(MarkAsReadMessageCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.Include(p => p.PersonalMessagesReceived).FirstAsync(p => p.Id == request.ReceiverId);
			var messages = user.PersonalMessagesReceived
				.Where(p => p.SenderId == request.SenderId)
				.Select(c => { c.IsRead = true; return c; })
				.ToList();
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
