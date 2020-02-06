using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Commands
{
	public class ChangeChatCommandHandler : BaseCommandHandler<ChangeChatCommand>
	{
		private readonly ChatContext _db;

		public ChangeChatCommandHandler(ChatContext db)
		{
			_db = db;
		}
		protected async override Task<CommandResult> HandleRequest(ChangeChatCommand request)
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
