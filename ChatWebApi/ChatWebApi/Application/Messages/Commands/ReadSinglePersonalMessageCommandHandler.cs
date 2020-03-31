using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Messages.Commands
{
	public class ReadSinglePersonalMessageCommand : IRequest<CommandResult>
	{
		public int MessageId { get; set; }
	}

	public class ReadSinglePersonalMessageCommandHandler : IRequestHandler<ReadSinglePersonalMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public ReadSinglePersonalMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}
		public async Task<CommandResult> Handle(ReadSinglePersonalMessageCommand request, CancellationToken cancellationToken)
		{
			var message = await _db.PersonalMessages.FirstAsync(p => p.Id == request.MessageId);
			message.IsRead = true;
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
