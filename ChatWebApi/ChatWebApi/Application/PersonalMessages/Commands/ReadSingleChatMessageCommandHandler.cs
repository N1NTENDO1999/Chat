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
	public class ReadSingleChatMessageCommand : IRequest<CommandResult>
	{
		public int MessageId { get; set; }
	}
	public class ReadSingleChatMessageCommandHandler : IRequestHandler<ReadSingleChatMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public ReadSingleChatMessageCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(ReadSingleChatMessageCommand request, CancellationToken cancellationToken)
		{
			var message = await _db.Messages.FirstAsync(p => p.Id == request.MessageId);
			message.IsRead = true;
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
