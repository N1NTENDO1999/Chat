using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.ScheduledMessages.Commands;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;

namespace ChatWebApi.Aplication.Tests.ScheduledMessages.Commands
{
	public class AddScheduledMessageCommandHandlerTest
	{
		[Fact]
		public async Task When_Add_Personal_Message_Scheduled_Without_Receiver_Then_Throw_Error()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "ScheduledDatabase")
				.Options;
			var command = new AddScheduledMessageCommand { Delivery = DateTime.Now, IsPersonal = true, ReceiverId = 1, SenderId = 1, Text = "text" };
			var mapper = new Mock<IMapper>();

			using (var context = new ChatContext(options))
			{
				var handler = new AddScheduledMessageCommandHandler(context, mapper.Object);

				await Assert.ThrowsAsync<InvalidOperationException>(() => handler.Handle(command, It.IsAny<CancellationToken>()));
			}
		}

		[Fact]
		public async Task When_Add_Chat_Message_Scheduled_Without_Receiver_Then_Throw_Error()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "ScheduledDatabase")
				.Options;
			var command = new AddScheduledMessageCommand { Delivery = DateTime.Now, IsPersonal = false, ReceiverId = 1, SenderId = 1, Text = "text" };
			var mapper = new Mock<IMapper>();

			using (var context = new ChatContext(options))
			{
				var handler = new AddScheduledMessageCommandHandler(context, mapper.Object);

				await Assert.ThrowsAsync<InvalidOperationException>(() => handler.Handle(command, It.IsAny<CancellationToken>()));
			}
		}

		[Fact]
		public async Task When_Add_Message_Scheduled_Then_Add_To_Database()
		{
			var options = new DbContextOptionsBuilder<ChatContext>()
				.UseInMemoryDatabase(databaseName: "ScheduledDatabase")
				.Options;
			var command = new AddScheduledMessageCommand { Delivery = DateTime.Now, IsPersonal = false, ReceiverId = 1, SenderId = 1, Text = "text" };
			var mapper = new Mock<IMapper>();
			mapper.Setup(p => p.Map<ScheduledMessage>(It.IsAny<AddScheduledMessageCommand>())).Returns(new ScheduledMessage
			{
				Text = command.Text,
				IsPersonal = command.IsPersonal
			});

			using (var context = new ChatContext(options))
			{
				await context.Users.AddAsync(new User { Id = 1 });
				await context.Chats.AddAsync(new Chat { Id = 1 });
				await context.SaveChangesAsync();
			}

			using (var context = new ChatContext(options))
			{
				var handler = new AddScheduledMessageCommandHandler(context, mapper.Object);
				var result = await handler.Handle(command, It.IsAny<CancellationToken>());
				var message = await context.ScheduledMessages.FirstOrDefaultAsync(p => p.Id == result.Id);

				Assert.NotNull(message);
				Assert.False(message.IsPersonal);
			}
		}
	}
}
