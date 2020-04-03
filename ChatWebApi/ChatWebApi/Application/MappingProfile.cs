using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Application.PersonalMessages.PersonalMessageDTOs;
using ChatWebApi.Application.ScheduledMessages.Commands;
using ChatWebApi.Application.ScheduledMessages.ScheduledMessagesDTOs;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Application.Users.Queries.UserDTOs;
using ChatWebApi.Application.Users.UserDTOs;
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

            CreateMap<PersonalMessage, MessageDTO>()
                .ReverseMap();

            CreateMap<ScheduledMessage, ScheduledMessageDTO>()
                .ReverseMap();

            CreateMap<Chat, AddChatPictureCommand>()
                .ReverseMap();

            CreateMap<User, EditUserProfileCommand>()
                .ReverseMap();

            CreateMap<ScheduledMessage, AddScheduledMessageCommand>()
                .ReverseMap();

            CreateMap<User, ProfileInfoDTO>()
                .ReverseMap();

            CreateMap<Chat, ChatProfileDTO>()
                .ReverseMap();

            CreateMap<Message, ChatMessageDTO>()
                .ReverseMap();

            CreateMap<User, ChatDTO>()
                .ForMember(p => p.IsPersonal, opt => opt.MapFrom(src => true))
                .ForMember(p => p.IsPrivate, opt => opt.MapFrom(src => true))
                .ForMember(p => p.Name, opt => opt.MapFrom(src => src.Nickname))
                .ReverseMap();
        }
    }
}
