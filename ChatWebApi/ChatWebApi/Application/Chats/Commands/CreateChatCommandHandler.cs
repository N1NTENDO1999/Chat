using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using ChatWebApi.Infrastructure.Entities;

namespace ChatWebApi.Application.Chats.Commands
{
	public class CreateChatCommand : ICommand
	{
		public string Name { get; set; }
		public bool IsPrivate { get; set; }
	}

	public class CreateChatCommandHandler : BaseCommandHandler<CreateChatCommand>
	{
		private readonly ChatContext _db;

		public CreateChatCommandHandler(ChatContext db)
		{
			_db = db;
		}

		protected override async Task<CommandResult> HandleRequest(CreateChatCommand request)
		{
			var chat = new Chat { DateCreated = DateTime.Now, IsPrivate = request.IsPrivate, Name = request.Name };
			await _db.Chats.AddAsync(chat);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
