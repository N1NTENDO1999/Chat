using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Chats.Commands
{
	public class AddChatPictureCommand : IRequest<CommandResult>
	{
		public int Id { get; set; }
		public string Picture { get; set; }
	}

	public class AddChatPictureCommandHandler : IRequestHandler<AddChatPictureCommand, CommandResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public AddChatPictureCommandHandler(ChatContext db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
		}

		public async Task<CommandResult> Handle(AddChatPictureCommand request, CancellationToken cancellationToken)
		{
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.Id);

			_mapper.Map(request, chat);

			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
