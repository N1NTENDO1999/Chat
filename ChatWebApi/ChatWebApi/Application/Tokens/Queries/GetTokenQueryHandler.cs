using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace ChatWebApi.Application.Tokens.Queries
{
	public class GetTokenQueryHandler : IQueryHandler<GetTokenQuery, GetTokenQueryResult>
	{
		private ChatContext _db;
		private IConfiguration _config;

		public GetTokenQueryHandler(ChatContext chatContext, IConfiguration config)
		{
			_db = chatContext;
			_config = config;
		}

		public async Task<GetTokenQueryResult> Handle(GetTokenQuery request)
		{
			if (request == null)
			{
				throw new ArgumentNullException(nameof(request), "Request Is Empty");
			}

			//TODO: Add some validation

			var user = await Authenticate(request);
			var tokenString = BuildToken(user);

			return new GetTokenQueryResult(tokenString);
		}

		private string BuildToken(User user)
		{
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSecurity:Key"]));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(_config["JWTSecurity:Issuer"],
			  _config["JWTSecurity:Audience"],
			  expires: DateTime.Now.AddMinutes(5),
			  signingCredentials: creds);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private async Task<User> Authenticate(GetTokenQuery login)
		{
			var user = await _db.Users.FirstAsync(p => p.Email == login.Email);
			//TODO: Password check
			return user;
		}
	}
}
