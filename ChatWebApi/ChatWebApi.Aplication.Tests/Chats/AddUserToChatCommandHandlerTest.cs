using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.UserChats.Commands;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.Chats
{
	public class AddUserToChatCommandHandlerTest
	{
		[Fact]
		public async void When_User_Is_Null_Then_Throws_Error()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "MovieListDatabase")
				.Options;
			var command = new AddUserToChatCommand { ChatId = 1, UserId = 1 };
			var mapper = new Mock<IMapper>();

			using (var context = new ChatContext(options)) 
			{
				await context.Users.AddAsync(new User { Id = 1 });
				await context.Chats.AddAsync(new Chat { Id = 1 });
				await context.SaveChangesAsync();
			}

			using (var context = new ChatContext(options))
			{
				var handler = new AddUserToChatCommandHandler(context, mapper.Object);

				await Assert.ThrowsAsync<ArgumentNullException>(() => handler.Handle(command, It.IsAny<CancellationToken>()));
			}

		}

	}
}
