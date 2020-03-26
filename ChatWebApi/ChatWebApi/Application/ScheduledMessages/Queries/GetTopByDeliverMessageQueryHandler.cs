using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Application.ScheduledMessages.Queries
{
	public class GetTopByDeliverMessageQuery : IRequest<ScheduledMessage>
	{}

	public class GetTopByDeliverMessageQueryHandler : IRequestHandler<GetTopByDeliverMessageQuery, ScheduledMessage>
	{
		private readonly ChatContext _db;

		public GetTopByDeliverMessageQueryHandler(ChatContext chatContext)
		{
			_db = chatContext;
		}

		public async Task<ScheduledMessage> Handle(GetTopByDeliverMessageQuery request, CancellationToken cancellationToken)
		{
			var result = await _db.ScheduledMessages.OrderBy(p => p.Delivery).FirstOrDefaultAsync();
			return result;
		}
	}
}
