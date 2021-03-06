﻿using System;
using System.Collections.Generic;
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
using Microsoft.Extensions.Configuration;

namespace ChatWebApi.Application.Users.Commands
{
	public class CreateUserCommand : IRequest<CommandCreateResult>
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Nickname { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
	}

	public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, CommandCreateResult>
	{
		private ChatContext _db;
		private readonly IConfiguration _config;

		public CreateUserCommandHandler(ChatContext chatContext, IConfiguration configuration) 
		{
			_db = chatContext;
			_config = configuration;
		}

		protected void AssertRequestIsValid(CreateUserCommand request)
		{
			if (string.IsNullOrEmpty(request.FirstName) |
				string.IsNullOrEmpty(request.LastName) |
				string.IsNullOrEmpty(request.Email) |
					string.IsNullOrEmpty(request.Nickname) |
					string.IsNullOrWhiteSpace(request.Password)) 
			{
				throw new ArgumentNullException(nameof(request));
			}
		}

		private string HashedPassword(string password, out byte[] salt)
		{
			salt = new byte[128 / 8];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(salt);
			}

			string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA1,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));

			return hashed;
		}

		public async Task<CommandCreateResult> Handle(CreateUserCommand request, CancellationToken cancellationToken)
		{
			AssertRequestIsValid(request);

			var hashedPassword = HashedPassword(request.Password, out byte[] salt);

			var picture = _config["DefaultPicture"];

			var user = new User
			{
				LastName = request.LastName,
				FirstName = request.FirstName,
				Email = request.Email,
				Nickname = request.Nickname,
				ActiveDateTime = DateTime.Now,
				DateCreated = DateTime.Now,
				PasswordHash = hashedPassword,
				PasswordSalt = salt,
				Picture = picture
				
			};

			var result = await _db.Users.AddAsync(user);
			await _db.SaveChangesAsync();

			return new CommandCreateResult(result.Entity.Id);
		}
	}
}
