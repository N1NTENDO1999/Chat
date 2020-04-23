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

namespace ChatWebApi.Application.Chats.Commands
{
	public class AddUserToAdminChatCommand : IRequest<CommandResult>
	{
		public int UserId { get; set; }
	}

	public class AddUserToAdminChatCommandHandler : IRequestHandler<AddUserToAdminChatCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public AddUserToAdminChatCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(AddUserToAdminChatCommand request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.FirstAsync(p => p.Name == "Admin");
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);

			var userchat = new UserChat(user, chat);

			var isInChat = await _db.UserChats.FirstOrDefaultAsync(p => p.ChatId == chat.Id & p.UserId == user.Id);

			if (isInChat == null)
			{
				await _db.UserChats.AddAsync(userchat);
				await _db.SaveChangesAsync();
			}

			return new CommandResult();
		}
	}
}
