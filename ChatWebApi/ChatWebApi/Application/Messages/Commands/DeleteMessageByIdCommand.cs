using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Messages.Commands
{
	public class DeleteMessageByIdCommand : IRequest<CommandResult>
	{
		public int Id { get; set; }
	}

	public class DeleteMessageByIdCommandHandler : IRequestHandler<DeleteMessageByIdCommand, CommandResult>
	{
		private readonly ChatContext _db;

		public DeleteMessageByIdCommandHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<CommandResult> Handle(DeleteMessageByIdCommand request, CancellationToken cancellationToken)
		{
			var message = await _db.Messages.FirstAsync(p => p.Id == request.Id);
			message.Text = "Updated";
			_db.Messages.Update(message);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
