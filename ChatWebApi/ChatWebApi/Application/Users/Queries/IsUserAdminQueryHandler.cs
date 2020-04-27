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
	public class IsUserAdminQuery : IRequest<IsUserAdminQueryResult>
	{
		public int UserId { get; set; }
	}

	public class IsUserAdminQueryResult
	{
		public bool IsAdmin { get; set; }
	}

	public class IsUserAdminQueryHandler : IRequestHandler<IsUserAdminQuery, IsUserAdminQueryResult>
	{
		private readonly ChatContext _db;

		public IsUserAdminQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<IsUserAdminQueryResult> Handle(IsUserAdminQuery request, CancellationToken cancellationToken)
		{
			var result = await _db.UserRoles.Include(p => p.Role).FirstOrDefaultAsync(p => p.UserId == request.UserId);
			if (result != null)
			{
				return new IsUserAdminQueryResult { IsAdmin = result.Role.UserRole == "Admin" };
			}
			return new IsUserAdminQueryResult { IsAdmin = false };
		}
	}
}
