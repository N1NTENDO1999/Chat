using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.Chats.Queries
{
	public class FindChatsByNameQueryHandlerTest
	{
		[Fact]
		public async Task When_Request_Is_Null_Then_Throw_Exception()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "FindChatDatabase")
				.Options;
			var config = new Mock<IConfiguration>();
			var mapper = new Mock<IMapper>();


			using (var context = new ChatContext(options))
			{
				var handler = new FindChatsByNameQueryHandler(context, mapper.Object);

				await Assert.ThrowsAsync<ArgumentNullException>(() => handler.Handle(null, It.IsAny<CancellationToken>()));
			}
		}
	}
}
