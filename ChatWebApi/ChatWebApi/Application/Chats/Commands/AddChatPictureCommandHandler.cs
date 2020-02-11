using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Commands
{
	public class AddChatPictureCommand : ICommand
	{
		public int Id { get; set; }
		public string Picture { get; set; }
	}

	public class AddChatPictureCommandHandler : BaseCommandHandler<AddChatPictureCommand>
	{
		private readonly ChatContext _db;

		public AddChatPictureCommandHandler(ChatContext db)
		{
			_db = db;
		}

		protected async override Task<CommandResult> HandleRequest(AddChatPictureCommand request)
		{
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.Id);

			chat.Picture = request.Picture;
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
