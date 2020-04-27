using System;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Tokens.Queries;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.Tokens.Queries
{
	public class GetTokenQueryHandlerTest
	{
		[Fact]
		public async Task When_User_Not_Correct_Then_Throws_Password_Exception()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "AddUserDatabase")
				.Options;
			var command = new CreateUserCommand { FirstName = "test", Nickname = "test test", LastName = "test", Email = "test@ukr.net", Password = "123456" };
			var loginCommand = new GetTokenQuery { Email = "test@ukr.net", Password = "1234567" };
			var config = new Mock<IConfiguration>();
			var mapper = new Mock<IMapper>();

			using (var context = new ChatContext(options))
			{
				var handler = new CreateUserCommandHandler(context, config.Object);
				var loginHandler = new GetTokenQueryHandler(context, config.Object, mapper.Object);
				await handler.Handle(command, It.IsAny<CancellationToken>());

				await Assert.ThrowsAsync<PasswordException>(() => loginHandler.Handle(loginCommand, It.IsAny<CancellationToken>()));
			}
		}

		[Fact]
		public async Task When_User_Correct_Then_Return_Token()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "AddUserDatabase")
				.Options;
			var command = new CreateUserCommand { FirstName = "test", Nickname = "test test", LastName = "test", Email = "test@ukr.net", Password = "123456" };
			var loginCommand = new GetTokenQuery { Email = "test@ukr.net", Password = "123456" };
			var config = new Mock<IConfiguration>();
			config.SetupGet(p => p[It.IsAny<string>()]).Returns("SecretSecretSecretSecretSecretSecretSecretSecretSecretSecretSecret");
			var mapper = new Mock<IMapper>();

			using (var context = new ChatContext(options))
			{
				var handler = new CreateUserCommandHandler(context, config.Object);
				var loginHandler = new GetTokenQueryHandler(context, config.Object, mapper.Object);
				await handler.Handle(command, It.IsAny<CancellationToken>());
				var result = await loginHandler.Handle(loginCommand, It.IsAny<CancellationToken>());

				Assert.NotNull(result);
				Assert.Equal(command.Email, result.Email);
				Assert.NotNull(result.Token);
			}
		}
	}
}
