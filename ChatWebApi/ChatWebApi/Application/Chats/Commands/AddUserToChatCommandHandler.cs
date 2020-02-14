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

namespace ChatWebApi.Application.UserChats.Commands
{
	public class AddUserToChatCommand : IRequest<CommandResult>
	{
		public int UserId { get; set; }
		public int ChatId { get; set; }
	}

	public class AddUserToChatCommandHandler : IRequestHandler<AddUserToChatCommand, CommandResult>
	{
		private ChatContext _db;

		public AddUserToChatCommandHandler(ChatContext chatContext)
		{
			_db = chatContext ?? throw new ArgumentNullException(nameof(chatContext));
		}

		public async Task<CommandResult> Handle(AddUserToChatCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.ChatId);

			var userchat = new UserChat(user, chat);
			await _db.UserChats.AddAsync(userchat);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
