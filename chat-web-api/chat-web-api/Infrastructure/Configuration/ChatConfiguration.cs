using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatWebApi.Infrastructure.Configuration
{
	public class ChatConfiguration : IEntityTypeConfiguration<Chat>
	{
		public void Configure(EntityTypeBuilder<Chat> builder)
		{
			builder.ToTable("Chats");
			builder.HasKey(e => e.Id);
			builder.Property(c => c.Name)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasMany(c => c.UserChats)
				.WithOne(c => c.Chat)
				.HasForeignKey(c => c.ChatId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.Messages)
				.WithOne(c => c.Chat)
				.HasForeignKey(c => c.ChatId)
				.OnDelete(DeleteBehavior.Cascade);

			builder.HasMany(c => c.ScheduledMessages)
				.WithOne(c => c.Chat)
				.HasForeignKey(c => c.ChatId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}
}
