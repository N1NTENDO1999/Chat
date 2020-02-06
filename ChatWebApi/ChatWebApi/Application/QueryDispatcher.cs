using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;

namespace ChatWebApi.Application
{
	public class QueryDispatcher : IQueryDispatcher
	{
        private readonly IHttpContextAccessor _context;

        public QueryDispatcher(IHttpContextAccessor context)
        {
            this._context = context;

        }

        public async Task<TResult> Handle<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>
        {
            if (query == null)
                throw new ArgumentNullException(nameof(query),
                                                "Command can not be null.");

            var handler = (IQueryHandler<TQuery, TResult>)this._context.HttpContext.RequestServices.
                GetService(typeof(IQueryHandler<TQuery, TResult>));

            return await handler.Handle(query);
        }
    }
}
