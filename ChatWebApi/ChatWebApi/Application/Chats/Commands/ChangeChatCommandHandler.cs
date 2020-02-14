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
	public class ChangeChatCommand : IRequest<CommandResult>
	{
		public int Id { get; set; }
		public bool IsPrivate { get; set; }
		public string Name { get; set; }
	}

	public class ChangeChatCommandHandler : IRequestHandler<ChangeChatCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public ChangeChatCommandHandler(ChatContext db)
		{
			_db = db ?? throw new ArgumentNullException(nameof(db));
		}

		public async Task<CommandResult> Handle(ChangeChatCommand request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.Id);

			if (chat.IsPrivate == request.IsPrivate && chat.Name == request.Name) return new CommandResult();

			chat.IsPrivate = request.IsPrivate;
			chat.Name = request.Name;
			_db.SaveChanges();

			return new CommandResult();
		}

	}
}
