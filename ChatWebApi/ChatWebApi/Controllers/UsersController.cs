using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Users.Commands;
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

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateUserCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

    }
}