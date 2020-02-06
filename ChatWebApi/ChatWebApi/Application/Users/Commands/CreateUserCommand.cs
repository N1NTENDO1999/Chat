using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;

namespace ChatWebApi.Application.Users.Commands
{
	public class CreateUserCommand : ICommand
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Nickname { get; set; }
		public string Email { get; set; }
	}
}
