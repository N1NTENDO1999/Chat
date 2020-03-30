using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Users.UserDTOs;
using ChatWebApi.Infrastructure;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Commands
{
	public class UpdateProfileInfoCommand : IRequest<CommandResult>
	{
		public ProfileInfoDTO profile { get; set; }
	}
	public class UpdateProfileInfoCommandHandler : IRequestHandler<UpdateProfileInfoCommand, CommandResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public UpdateProfileInfoCommandHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<CommandResult> Handle(UpdateProfileInfoCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.profile.Id);
			var updatedUser = _mapper.Map(request.profile, user);
			_db.Users.Update(updatedUser);
			await _db.SaveChangesAsync();
			return new CommandResult();
		}
	}
}
