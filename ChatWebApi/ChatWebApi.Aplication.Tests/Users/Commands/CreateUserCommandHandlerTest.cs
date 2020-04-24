using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.Users.Commands
{
	public class CreateUserCommandHandlerTest
	{
		[Fact]
		public async Task When_Register_User_Then_Add_To_Db_With_Hashed_Password()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "CreateChatDatabase")
				.Options;
			var command = new CreateUserCommand { FirstName = "test", Nickname = "test test", LastName = "test", Email = "test@ukr.net", Password = "123456" };
			var config = new Mock<IConfiguration>();

			using (var context = new ChatContext(options))
			{
				var handler = new CreateUserCommandHandler(context, config.Object);
				var result = await handler.Handle(command, It.IsAny<CancellationToken>());
				var user = await context.Users.FirstOrDefaultAsync(p => p.Nickname == "test test");

				Assert.NotNull(user);
				Assert.NotNull(user.PasswordHash);
				Assert.NotNull(user.PasswordSalt);
			}
		}

		[Fact]
		public async Task When_Argument_Not_Correct_Then_Throw_ArgumentNullException()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "CreateChatDatabase")
				.Options;
			var command = new CreateUserCommand { FirstName = "test", LastName = "test", Email = "test@ukr.net", Password = "123456" };
			var config = new Mock<IConfiguration>();

			using (var context = new ChatContext(options))
			{
				var handler = new CreateUserCommandHandler(context, config.Object);

				await Assert.ThrowsAsync<ArgumentNullException>(() => handler.Handle(command, It.IsAny<CancellationToken>()));				
			}
		}
	}
}
