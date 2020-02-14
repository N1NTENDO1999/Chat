using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ChatWebApi.Application.Tokens.Queries
{

	public class GetTokenQuery : IRequest<GetTokenQueryResult>
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}

	public class GetTokenQueryResult 
	{
		public string Token { get; set; }

		public GetTokenQueryResult(string token)
		{
			Token = token;
		}
	}

	public class GetTokenQueryHandler : IRequestHandler<GetTokenQuery, GetTokenQueryResult>
	{
		private ChatContext _db;
		private IConfiguration _config;

		public GetTokenQueryHandler(ChatContext chatContext, IConfiguration config)
		{
			_db = chatContext;
			_config = config;
		}

		private string BuildToken(User user)
		{
			var claims = new[] {
				new Claim(ClaimTypes.Name, user.Nickname),
				new Claim(JwtRegisteredClaimNames.Email, user.Email),
				new Claim(JwtRegisteredClaimNames.Birthdate, user.DateCreated.ToString("yyyy-MM-dd")),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSecurity:Key"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(_config["JWTSecurity:Issuer"],
			  _config["JWTSecurity:Audience"],
			  claims,
			  expires: DateTime.Now.AddMinutes(5),
			  signingCredentials: creds);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private async Task<User> Authenticate(GetTokenQuery login)
		{
			var user = await _db.Users.FirstAsync(p => p.Email == login.Email);
			var hashedPassword = HashedPassword(login.Password, user);

			if (user.PasswordHash != hashedPassword) throw new PasswordException("Invalid Password");

			return user;
		}

		public async Task<GetTokenQueryResult> Handle(GetTokenQuery request, CancellationToken cancellationToken)
		{
			if (request == null)
			{
				throw new ArgumentNullException(nameof(request), "Request Is Empty");
			}

			var user = await Authenticate(request);
			var tokenString = BuildToken(user);

			return new GetTokenQueryResult(tokenString);
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
	}
}
