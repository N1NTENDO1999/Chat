using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatWebApi.Infrastructure.Configuration
{
	public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			builder.ToTable("Users");

			builder.Property(p => p.FirstName)
				.IsRequired()
				.HasMaxLength(255);

			builder.Property(p => p.LastName)
				.IsRequired()
				.HasMaxLength(255);

			builder.Property(p => p.Nickname)
				.IsRequired()
				.HasMaxLength(255);

			builder.Property(p => p.Email)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasMany(c => c.Messages)
				.WithOne(c => c.Sender)
				.HasForeignKey(c => c.SenderId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.UserChats)
				.WithOne(c => c.User)
				.HasForeignKey(c => c.ChatId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.ScheduledMessages)
				.WithOne(c => c.Sender)
				.HasForeignKey(c => c.SenderId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.PersonalMessagesSent)
				.WithOne(c => c.Sender)
				.HasForeignKey(c => c.SenderId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.PersonalMessagesReceived)
				.WithOne(c => c.Receiver)
				.HasForeignKey(c => c.ReceiverId)
				.OnDelete(DeleteBehavior.Cascade);

		}
	}
}
