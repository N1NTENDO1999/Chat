using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ChatWebApi.Infrastructure.Configuration
{
	public class PersonalMessageConfiguration : IEntityTypeConfiguration<PersonalMessage>
	{
		public void Configure(EntityTypeBuilder<PersonalMessage> builder)
		{
			builder.ToTable("PersonalMessages");

			builder.Property(m => m.Text)
				.IsRequired()
				.HasMaxLength(255);

			builder.HasOne(m => m.Sender)
				.WithMany(m => m.PersonalMessagesSent)
				.HasForeignKey(m => m.SenderId);

			builder.HasOne(m => m.Receiver)
				.WithMany(m => m.PersonalMessagesReceived)
				.HasForeignKey(m => m.ReceiverId);

		}
	}
}
