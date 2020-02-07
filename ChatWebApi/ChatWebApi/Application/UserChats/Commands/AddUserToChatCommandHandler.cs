using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.UserChats.Commands
{
	public class AddUserToChatCommandHandler : BaseCommandHandler<AddUserToChatCommand>
	{
		private ChatContext _db;

		public AddUserToChatCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		protected async override Task<CommandResult> HandleRequest(AddUserToChatCommand request)
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
