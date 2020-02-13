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

namespace ChatWebApi.Application.Users.Commands
{
	public class EditUserProfileCommand : IRequest<CommandResult>
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Nickname { get; set; }
	}

	public class EditUserProfileCommandHandler : IRequestHandler<EditUserProfileCommand, CommandResult>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public EditUserProfileCommandHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<CommandResult> Handle(EditUserProfileCommand request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.Id);
			_mapper.Map(request, user);
			await _db.SaveChangesAsync();

			return new CommandResult();
		}
	}
}
