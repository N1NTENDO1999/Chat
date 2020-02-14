using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.PersonalMessages.Queries
{
	public class GetUserActivityStatusQuery : IRequest<GetUserActivityStatusQueryResult>
	{
		public int UserId { get; set; }
	}

	public class GetUserActivityStatusQueryResult
	{
		public DateTime ActiveTime { get; set; }
	}

	public class GetUserActivityStatusQueryHandler : IRequestHandler<GetUserActivityStatusQuery, GetUserActivityStatusQueryResult>
	{
		private readonly ChatContext _db;

		public GetUserActivityStatusQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<GetUserActivityStatusQueryResult> Handle(GetUserActivityStatusQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);

			return new GetUserActivityStatusQueryResult { ActiveTime = user.ActiveDateTime };
		}
	}
}
