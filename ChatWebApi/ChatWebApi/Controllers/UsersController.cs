using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Application.Users.Queries;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<UsersQueryResult> GetAllUsers()
        {
            return await _mediator.Send(new GetAllUsersQuery());
        }
        [HttpGet]
        [Route("user/{id}")]
        public async Task<GetUserQueryResult> GetUser(int id) 
        {
            return await _mediator.Send(new GetUserQuery { Id = id });
        }

        [HttpPost]
        public async Task<CommandResult> CreateUser(CreateUserCommand request)
        {
            return await _mediator.Send(request);
        }

        [HttpPut]
        [Route("user/{id}/password")]
        public async Task<CommandResult> UpdatePassword(UpdatePasswordCommand request)
        {
            return await _mediator.Send(request);
        }

        [HttpPut]
        [Route("user/{id}/picture")]
        public async Task<CommandResult> UpdatePicture(UpdateUserPictureCommand request)
        {
            return await _mediator.Send(request);
        }

    }
}