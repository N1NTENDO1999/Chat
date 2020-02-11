using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Interfaces.Requests
{
    public interface ICommandHandler<in TCommand> where TCommand : ICommand
    {
        Task<CommandResult> Handle(TCommand request);
    }

    public abstract class BaseCommandHandler<TRequest> : ICommandHandler<TRequest> where TRequest : ICommand
    {
        public Task<CommandResult> Handle(TRequest request)
        {
            AssertRequestIsValid(request);

            return HandleRequest(request);
        }

        protected abstract Task<CommandResult> HandleRequest(TRequest request);

        protected virtual void AssertRequestIsValid(TRequest request)
        {
            if (request == null)
            {
                throw new ArgumentNullException(nameof(request));
            }
        }
    }
}
