using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatWebApi.Infrastructure.Configuration
{
	public class MessageConfiguration : IEntityTypeConfiguration<Message>
	{
		public void Configure(EntityTypeBuilder<Message> builder)
		{
			builder.ToTable("Messages");

			builder.Property(m => m.Text)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasOne(m => m.Sender)
				.WithMany(m => m.Messages)
				.HasForeignKey(m => m.SenderId)
				.OnDelete(DeleteBehavior.Restrict);

			builder.HasOne(m => m.Chat)
				.WithMany(m => m.Messages)
				.HasForeignKey(m => m.ChatId)
				.OnDelete(DeleteBehavior.Restrict);
		}
	}
}
