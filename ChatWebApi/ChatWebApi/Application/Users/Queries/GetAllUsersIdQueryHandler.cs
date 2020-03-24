using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{

	public class GetAllUsersIdQuery : IRequest<IEnumerable<int>>
	{}

	public class GetAllUsersIdQueryHandler : IRequestHandler<GetAllUsersIdQuery, IEnumerable<int>>
	{
		private readonly ChatContext _db;

		public GetAllUsersIdQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<IEnumerable<int>> Handle(GetAllUsersIdQuery request, CancellationToken cancellationToken)
		{
			var result = await _db.Users.Select(p => p.Id).ToListAsync();
			return result;
		}
	}
}
