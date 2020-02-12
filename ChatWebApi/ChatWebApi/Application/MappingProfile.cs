using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application.Chats.ChatDTOs;
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
                .ForMember(dest => 
                dest.Users,
                opt => opt.MapFrom(src => src.UserChats.Select(p => p.User)))
                .ReverseMap();
        }
    }
}
