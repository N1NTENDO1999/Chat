using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace ChatWebApi.Application.Tokens.Queries
{
	public class GetGoogleUserTokenQuery : IRequest<GetGoogleUserTokenQueryResult>
	{
        public string Token { get; set; }
    }

	public class GetGoogleUserTokenQueryResult
	{
		public int Id { get; set; }
		public string Token { get; set; }
		public string Email { get; set; }
	}

	public class GetGoogleUserTokenQueryHandler : IRequestHandler<GetGoogleUserTokenQuery, GetGoogleUserTokenQueryResult>
	{
		private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";
		private readonly ChatContext _db;
		private readonly IConfiguration _config;
		private readonly IMapper _mapper;

		public GetGoogleUserTokenQueryHandler(ChatContext chatContext, IConfiguration config, IMapper mapper)
		{
			_db = chatContext;
			_config = config;
			_mapper = mapper;
		}

		public async Task<GetGoogleUserTokenQueryResult> Handle(GetGoogleUserTokenQuery request, CancellationToken cancellationToken)
		{
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, request.Token));

            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(requestUri);
            
            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            var response = await httpResponseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

			var user = await _db.Users.FirstOrDefaultAsync(p => p.Email == googleApiTokenInfo.email);

			if (user == null) 
			{
				user = await RegisterUser(googleApiTokenInfo);
			}

			string token = BuildToken(user);

            return new GetGoogleUserTokenQueryResult { Email = googleApiTokenInfo.email, Token = token, Id = user.Id };
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

		private async Task<User> RegisterUser(GoogleApiTokenInfo user)
		{
			var _user = new User
			{
				Picture = user.picture,
				LastName = user.family_name,
				FirstName = user.given_name,
				Email = user.email,
				Nickname = user.name,
				ActiveDateTime = DateTime.Now,
				DateCreated = DateTime.Now
			};

			var result = await _db.Users.AddAsync(_user);
			await _db.SaveChangesAsync();

			return result.Entity;
		}
	}
}
