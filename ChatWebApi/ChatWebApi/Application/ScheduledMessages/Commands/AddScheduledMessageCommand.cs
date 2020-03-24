using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.ScheduledMessages.Commands
{
	public class AddScheduledMessageCommand : IRequest<CommandResult>
	{
		public int ReceiverId { get; set; }
		public int SenderId { get; set; }
		public string Text { get; set; }
		public DateTime Delivery { get; set; }
		public bool IsPersonal { get; set; }
	}

	public class AddScheduledMessageCommandHandler : IRequestHandler<AddScheduledMessageCommand, CommandResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public AddScheduledMessageCommandHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<CommandResult> Handle(AddScheduledMessageCommand request, CancellationToken cancellationToken)
		{
			if (string.IsNullOrWhiteSpace(request.Text))
				throw new ArgumentNullException("No Text In Message", nameof(request));

			if (request.IsPersonal)
			{	var receiver = await _db.Users.FirstAsync(p => p.Id == request.ReceiverId);	}
			else
			{	var chat = await _db.Chats.FirstAsync(p => p.Id == request.ReceiverId);	}

			var user = await _db.Users.FirstAsync(p => p.Id == request.SenderId);

			var message = _mapper.Map<ScheduledMessage>(request);
			await _db.ScheduledMessages.AddAsync(message);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
