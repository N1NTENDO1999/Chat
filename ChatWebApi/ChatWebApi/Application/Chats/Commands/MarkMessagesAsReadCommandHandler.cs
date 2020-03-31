using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Commands
{
	public class MarkMessagesAsReadCommand : IRequest<CommandResult>
	{
		public int ChatId { get; set; }
		public int UserId { get; set; }
	}
	public class MarkMessagesAsReadCommandHandler : IRequestHandler<MarkMessagesAsReadCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public MarkMessagesAsReadCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(MarkMessagesAsReadCommand request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.Include(p => p.Messages).FirstAsync(p => p.Id == request.ChatId);
			var messages = chat.Messages.Where(p => p.SenderId != request.UserId).Select(c => { c.IsRead = true; return c; }).ToList();
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
