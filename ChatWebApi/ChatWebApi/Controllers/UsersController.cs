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
        private CommandDispatcher _commandDispatcher;
        private readonly IMediator _mediator;

        public UsersController(CommandDispatcher cdis, IMediator mediator)
        {
            _commandDispatcher = cdis;
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<UsersQueryResult> GetAllUsers()
        {
            return await _mediator.Send(new GetAllUsersQuery());
        }

        [HttpPost]
        public async Task<CommandResult> CreateUser(CreateUserCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

    }
}