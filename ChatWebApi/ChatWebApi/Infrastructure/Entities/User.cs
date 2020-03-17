using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatWebApi.Infrastructure.Entities
{
	public class User
	{
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Nickname { get; set; }
        public string Email { get; set; }
        public string Picture { get; set; }
        public string PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ActiveDateTime { get; set; }

        public List<ScheduledMessage> ScheduledMessages { get; set; }
        public List<Message> Messages { get; set; }
        public List<PersonalMessage> PersonalMessagesSent { get; set; }
        public List<PersonalMessage> PersonalMessagesReceived { get; set; }
        public List<UserChat> UserChats { get; set; }
        public List<Chat> CreatedChats { get; set; }
        public User()
        {
            ScheduledMessages = new List<ScheduledMessage>();
            Messages = new List<Message>();
            PersonalMessagesSent = new List<PersonalMessage>();
            PersonalMessagesReceived = new List<PersonalMessage>();
            UserChats = new List<UserChat>();
        }
    }
}
