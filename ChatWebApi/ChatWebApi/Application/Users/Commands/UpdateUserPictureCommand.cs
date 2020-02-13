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
	public class UpdateUserPictureCommand : IRequest<CommandResult>
	{
		public int UserId { get; set; }
		public string Picture { get; set; }
	}

	public class UpdateUserPictureCommandHandler : IRequestHandler<UpdateUserPictureCommand, CommandResult>
	{
		private ChatContext _db;

		public UpdateUserPictureCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(UpdateUserPictureCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			user.Picture = request.Picture;
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
