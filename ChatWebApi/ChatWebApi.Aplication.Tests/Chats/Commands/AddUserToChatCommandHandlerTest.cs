using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
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
		public async Task When_User_Is_Null_Then_Throws_Error()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "ChatDatabase")
				.Options;
			var command = new AddUserToChatCommand { ChatId = 2, UserId = 2 };
			var mapper = new Mock<IMapper>();
			mapper.Setup(p => p.Map<ChatDTO>(It.IsAny<Chat>()));

			using (var context = new ChatContext(options))
			{
				await context.Users.AddAsync(new User { Id = 1 });
				await context.Chats.AddAsync(new Chat { Id = 1 });
				await context.SaveChangesAsync();
			}

			using (var context = new ChatContext(options))
			{
				var handler = new AddUserToChatCommandHandler(context, mapper.Object);

				await Assert.ThrowsAsync<InvalidOperationException>(() => handler.Handle(command, It.IsAny<CancellationToken>()));
			}

		}

		[Fact]
		public async Task When_User_Not_Null_Then_Returns_User()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "ChatDatabase")
				.Options;
			var command = new AddUserToChatCommand { ChatId = 2, UserId = 2 };
			var mapper = new Mock<IMapper>();
			mapper.Setup(p => p.Map<ChatDTO>(It.IsAny<Chat>())).Returns(new ChatDTO { Id = 2});

			using (var context = new ChatContext(options))
			{
				await context.Users.AddAsync(new User { Id = 2 });
				await context.Chats.AddAsync(new Chat { Id = 2 });
				await context.SaveChangesAsync();
			}

			using (var context = new ChatContext(options))
			{
				var handler = new AddUserToChatCommandHandler(context, mapper.Object);
				var result = await handler.Handle(command, It.IsAny<CancellationToken>());

				Assert.Equal(2, result.Id);
			}

		}

	}
}
