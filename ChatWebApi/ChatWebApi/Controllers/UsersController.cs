using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Application.Users.Queries;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private CommandDispatcher _commandDispatcher;
        private QueryDispatcher _queryDispatcher;

        public UsersController(CommandDispatcher cdis, QueryDispatcher qdis)
        {
            _commandDispatcher = cdis;
            _queryDispatcher = qdis;
        }

        [HttpGet("all/users")]
        public async Task<UsersQueryResult> GetAllUsers()
        {
            return await _queryDispatcher.Handle<GetAllUsersQuery, UsersQueryResult>(new GetAllUsersQuery());
        }

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateUserCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

    }
}