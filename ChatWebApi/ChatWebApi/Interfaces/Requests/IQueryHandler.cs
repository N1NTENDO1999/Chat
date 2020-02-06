using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Interfaces.Requests
{
    public interface IQueryHandler<in TRequest,  TResponse>
        where TRequest : IQuery<TResponse>
    {
        Task<TResponse> Handle(TRequest request);
    }
}
