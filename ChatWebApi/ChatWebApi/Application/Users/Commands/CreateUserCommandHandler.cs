using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;

namespace ChatWebApi.Application.Users.Commands
{
	public class CreateUserCommand : IRequest<CommandResult>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Nickname { get; set; }
		public string Email { get; set; }
	}

	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CommandResult>
	{
		private ChatContext _db;

		public CreateUserCommandHandler(ChatContext chatContext) 
		{
			_db = chatContext;
		}

		protected void AssertRequestIsValid(CreateUserCommand request)
		{
			if (string.IsNullOrEmpty(request.FirstName) |
				string.IsNullOrEmpty(request.LastName) |
				string.IsNullOrEmpty(request.Email) |
					string.IsNullOrEmpty(request.Nickname)) 
			{
				throw new ArgumentNullException(nameof(request));
			}
		}

		public async Task<CommandResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
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
	}
}
