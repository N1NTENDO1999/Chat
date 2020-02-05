using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Interfaces.Requests
{
	public interface ICommandDispatcher
	{
		Task<CommandResult> Execute<TCommand>(TCommand command) where TCommand : ICommand;
	}
}
