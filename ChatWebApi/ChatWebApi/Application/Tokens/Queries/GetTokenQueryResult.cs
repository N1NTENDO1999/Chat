using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Tokens.Queries
{
	public class GetTokenQueryResult : IQueryResult
	{
		public string Token { get; set; }

		public GetTokenQueryResult(string token)
		{
			Token = token;
		}
	}
}
