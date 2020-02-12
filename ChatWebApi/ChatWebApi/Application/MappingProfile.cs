using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Application.PersonalMessages.PersonalMessageDTOs;
using ChatWebApi.Application.ScheduledMessages.ScheduledMessagesDTOs;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Infrastructure.Entities;

namespace ChatWebApi.Application
{
	public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>()
                .ReverseMap();

            CreateMap<Chat, ChatDTO>()
                .ReverseMap();

            CreateMap<Message, MessageDTO>()
                .ReverseMap();

            CreateMap<PersonalMessage, PersonalMessageDTO>()
                .ReverseMap();

            CreateMap<ScheduledMessage, ScheduledMessageDTO>()
                .ReverseMap();
        }
    }
}
