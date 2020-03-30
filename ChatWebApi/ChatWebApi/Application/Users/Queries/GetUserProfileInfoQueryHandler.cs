using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Users.UserDTOs;
using ChatWebApi.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.Users.Queries
{
	public class GetUserProfileInfoQuery : IRequest<ProfileInfoDTO>
	{
		public int Id { get; set; }
	}
	public class GetUserProfileInfoQueryHandler : IRequestHandler<GetUserProfileInfoQuery, ProfileInfoDTO>
	{
		private readonly ChatContext _db;
		private readonly IMapper _mapper;

		public GetUserProfileInfoQueryHandler(ChatContext chatContext, IMapper mapper)
		{
			_db = chatContext;
			_mapper = mapper;
		}

		public async Task<ProfileInfoDTO> Handle(GetUserProfileInfoQuery request, CancellationToken cancellationToken)
		{
			var user = await _db.Users.FirstAsync(p => p.Id == request.Id);
			var result = _mapper.Map<ProfileInfoDTO>(user);
			return result;
		}
	}
}
