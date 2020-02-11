using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Tokens.Queries
{
	public class GetTokenQuery : IQuery<GetTokenQueryResult>
	{
		public string Email { get; set; }
		public string Password { get; set; }
	}
}
