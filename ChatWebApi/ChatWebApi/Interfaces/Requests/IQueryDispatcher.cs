using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Interfaces.Requests
{
	public interface IQueryDispatcher
	{
		Task<TResult> Handle<TQuery, TResult>(TQuery query) where TQuery : IQuery<TResult>;
	}
}
