using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.UserChats.Commands;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.Chats.Commands
{
	public class CreateChatCommandHandlerTest
	{
		[Fact]
		public async Task When_Create_Chat_Then_Add_It_To_Db()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "CreateChatDatabase")
				.Options;
			var command = new CreateChatCommand{ Name = "name", IsPrivate = false, UserId = 1};
			var config = new Mock<IConfiguration>();
			var mapper = new Mock<IMapper>();
			mapper.Setup(p => p.Map<ChatDTO>(It.IsAny<Chat>())).Returns(new ChatDTO { Name = command.Name });

			using (var context = new ChatContext(options))
			{
				await context.Users.AddAsync(new User { Nickname = "user" });
				await context.SaveChangesAsync();
			}

			using (var context = new ChatContext(options))
			{
				var handler = new CreateChatCommandHandler(context, mapper.Object, config.Object);
				var result = await handler.Handle(command, It.IsAny<CancellationToken>());
				var chat = await context.Chats.FirstOrDefaultAsync(p => p.Name == "name");

				Assert.Equal("name", result.Chat.Name);
				Assert.NotNull(chat);
			}
		}
	}
}
