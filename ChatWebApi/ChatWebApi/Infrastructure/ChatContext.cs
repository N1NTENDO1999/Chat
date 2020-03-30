using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Infrastructure.Configuration;
using ChatWebApi.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace ChatWebApi.Infrastructure
{
	public class ChatContext : DbContext
	{
		public DbSet<Chat> Chats { get; set; }
		public DbSet<Message> Messages { get; set; }
		public DbSet<PersonalMessage> PersonalMessages { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<ScheduledMessage> ScheduledMessages { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserChat> UserChats { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }

		public ChatContext(DbContextOptions<ChatContext> options)
			: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.ApplyConfiguration(new ChatConfiguration());
			modelBuilder.ApplyConfiguration(new MessageConfiguration());
			modelBuilder.ApplyConfiguration(new PersonalMessageConfiguration());
			modelBuilder.ApplyConfiguration(new RoleConfiguration());
			modelBuilder.ApplyConfiguration(new ScheduledMessageConfiguration());
			modelBuilder.ApplyConfiguration(new UserChatConfiguration());
			modelBuilder.ApplyConfiguration(new UserConfiguration());
			modelBuilder.ApplyConfiguration(new UserRoleConfiguration());


			base.OnModelCreating(modelBuilder);
		}

		internal Task FirstAsync()
		{
			throw new NotImplementedException();
		}
	}
}
