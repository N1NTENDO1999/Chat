using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using ChatWebApi.Infrastructure.Entities;
using MediatR;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using ChatWebApi.Application.Chats.ChatDTOs;
using AutoMapper;

namespace ChatWebApi.Application.Chats.Commands
{
	public class CreateChatCommand : IRequest<CommandChatResult>
	{
		public string Name { get; set; }
		public int UserId { get; set; }
		public bool IsPrivate { get; set; }
	}

	public class CommandChatResult
	{
		public ChatDTO Chat	{ get; set; }
	}

	public class CreateChatCommandHandler : IRequestHandler<CreateChatCommand, CommandChatResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public CreateChatCommandHandler(ChatContext db, IMapper mapper)
		{
			_db = db;
			_mapper = mapper;
		}

		public async Task<CommandChatResult> Handle(CreateChatCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			var chat = new Chat { DateCreated = DateTime.Now, IsPrivate = request.IsPrivate, Name = request.Name, Owner = user };
			var result = await _db.Chats.AddAsync(chat);
			await _db.SaveChangesAsync();

			return new CommandChatResult { Chat= _mapper.Map<ChatDTO>(result.Entity) };
		}
	}
}
