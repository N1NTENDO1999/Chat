using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Commands
{
	public class UpdatePasswordCommand : IRequest<CommandResult>
	{
		public int UserId { get; set; }
		public string OldPassword { get; set; }
		public string NewPassword { get; set; }
	}

	public class UpdatePasswordCommandHandler : IRequestHandler<UpdatePasswordCommand, CommandResult>
	{
		private ChatContext _db;

		public UpdatePasswordCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		private string HashedPassword(string password, User user)
		{
			var salt = user.PasswordSalt;

			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA1,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));

			return hashed;
		}

		public async Task<CommandResult> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);

			var hashedPassword = HashedPassword(request.OldPassword, user);

			if (user.PasswordHash != hashedPassword) throw new PasswordException("Invalid Password");

			var newHashed = HashedPassword(request.NewPassword, user);
			user.PasswordHash = newHashed;
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
