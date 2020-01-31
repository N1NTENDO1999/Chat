using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatWebApi.Infrastructure.Configuration
{

	public class ScheduledMessageConfiguration : IEntityTypeConfiguration<ScheduledMessage>
	{
		public void Configure(EntityTypeBuilder<ScheduledMessage> builder)
		{
			builder.ToTable("ScheduledMessages");

			builder.Property(p => p.Delivery)
				.IsRequired();

			builder.Property(p => p.Text)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasOne(p => p.Sender)
				.WithMany(p => p.ScheduledMessages)
				.HasForeignKey(p => p.SenderId);

			builder.HasOne(p => p.Chat)
				.WithMany(p => p.ScheduledMessages)
				.HasForeignKey(p => p.ChatId);
		}
	}
}
