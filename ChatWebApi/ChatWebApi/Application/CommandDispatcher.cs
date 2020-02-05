using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;

namespace ChatWebApi.Application
{
	public class CommandDispatcher : ICommandDispatcher
	{
		private readonly IHttpContextAccessor _context;

		public CommandDispatcher(IHttpContextAccessor context)
		{
			this._context = context;
		}

        public async Task<CommandResult> Execute<TRequest>(TRequest command) where TRequest : ICommand
        {
            if (command == null)
                throw new ArgumentNullException(nameof(command),
                                                "Command can not be null.");


            var handler = (ICommandHandler<TRequest>)this._context.HttpContext.RequestServices.
                GetService(typeof(ICommandHandler<TRequest>));


            return await handler.Handle(command);
        }
    }
}
