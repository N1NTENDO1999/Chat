using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Commands
{
	public class UpdateUserActivityStatusCommand : IRequest<CommandResult>
	{
		public int UserId { get; set; }
	}

	public class UpdateUserActivityStatusCommandHandler : IRequestHandler<UpdateUserActivityStatusCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public UpdateUserActivityStatusCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(UpdateUserActivityStatusCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			user.ActiveDateTime = DateTime.Now;
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
