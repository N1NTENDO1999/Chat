using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.UserChats.Commands
{
	public class AddUserToChatCommand : IRequest<ChatDTO>
	{
		public int UserId { get; set; }
		public int ChatId { get; set; }
	}

	public class AddUserToChatCommandHandler : IRequestHandler<AddUserToChatCommand, ChatDTO>
	{
		private ChatContext _db;
		private readonly IMapper _mapper;

		public AddUserToChatCommandHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext ?? throw new ArgumentNullException(nameof(chatContext));
			_mapper = mapper;
		}

		public async Task<ChatDTO> Handle(AddUserToChatCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.UserId);
			var chat = await _db.Chats.FirstAsync(p => p.Id == request.ChatId);

			var userchat = new UserChat(user, chat);
			await _db.UserChats.AddAsync(userchat);
			await _db.SaveChangesAsync();

			var result = _mapper.Map<ChatDTO>(chat);

			return result;
		}
	}
}
