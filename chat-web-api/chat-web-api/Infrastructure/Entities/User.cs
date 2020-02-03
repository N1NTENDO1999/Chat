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
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ActiveDateTime { get; set; }

        public HashSet<ScheduledMessage> ScheduledMessages { get; set; }
        public HashSet<Message> Messages { get; set; }
        public HashSet<PersonalMessage> PersonalMessagesSent { get; set; }
        public HashSet<PersonalMessage> PersonalMessagesReceived { get; set; }
        public HashSet<UserChat> UserChats { get; set; }
    }
}
