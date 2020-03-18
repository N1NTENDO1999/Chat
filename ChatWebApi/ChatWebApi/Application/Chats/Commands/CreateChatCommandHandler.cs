using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using ChatWebApi.Infrastructure.Entities;
using MediatR;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Commands
{
	public class CreateChatCommand : IRequest<CommandCreateResult>
	{
		public string Name { get; set; }
		public int UserId { get; set; }
		public bool IsPrivate { get; set; }
	}

	public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand, CommandCreateResult>
	{
		private readonly ChatContext _db;

		public CreateChatCommandHandler(ChatContext db)
		{
			_db = db;
		}

		public async Task<CommandCreateResult> Handle(CreateChatCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			var chat = new Chat { DateCreated = DateTime.Now, IsPrivate = request.IsPrivate, Name = request.Name, Owner = user };
			await _db.Chats.AddAsync(chat);
			await _db.SaveChangesAsync();

			return new CommandCreateResult(chat.Id);
		}
	}
}
