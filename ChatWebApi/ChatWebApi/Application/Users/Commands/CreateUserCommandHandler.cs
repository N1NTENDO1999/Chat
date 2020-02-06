using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Users.Commands
{
	public class CreateUserCommandHandler : BaseCommandHandler<CreateUserCommand>
	{
		private ChatContext _db;

		public CreateUserCommandHandler(ChatContext chatContext) 
		{
			_db = chatContext;
		}

		protected async override Task<CommandResult> HandleRequest(CreateUserCommand request)
		{
			AssertRequestIsValid(request);
			var user = new User
			{
				LastName = request.LastName,
				FirstName = request.FirstName,
				Email = request.Email,
				Nickname = request.Nickname,
				ActiveDateTime = DateTime.Now,
				DateCreated = DateTime.Now
			};

			await _db.Users.AddAsync(user);
			await _db.SaveChangesAsync();

			return new CommandResult();

		}

		protected override void AssertRequestIsValid(CreateUserCommand request)
		{
			if (string.IsNullOrEmpty(request.FirstName) |
				string.IsNullOrEmpty(request.LastName) |
				string.IsNullOrEmpty(request.Email) |
					string.IsNullOrEmpty(request.Nickname)) 
			{
				throw new ArgumentNullException(nameof(request));
			}
		}
	}
}
