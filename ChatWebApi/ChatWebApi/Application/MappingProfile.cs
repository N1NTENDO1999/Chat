﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Messages.MessageDTOs;
using ChatWebApi.Application.PersonalMessages.PersonalMessageDTOs;
using ChatWebApi.Application.ScheduledMessages.ScheduledMessagesDTOs;
using ChatWebApi.Application.Users.Commands;
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

            CreateMap<Chat, AddChatPictureCommand>()
                .ReverseMap();

            CreateMap<User, EditUserProfileCommand>()
                .ReverseMap();

            CreateMap<User, ChatDTO>()
                .ForMember(p => p.IsPersonal, opt => opt.AddTransform((x) => true))
                .ForMember(p => p.IsPrivate, opt => opt.AddTransform((x) => true))
                .ForMember(p => p.Name, opt => opt.MapFrom(src => src.FirstName + src.LastName))
                .ReverseMap();
        }
    }
}
