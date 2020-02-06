using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private CommandDispatcher _commandDispatcher;
        private QueryDispatcher _queryDispatcher;

        public ChatController(CommandDispatcher cdis, QueryDispatcher qdis)
        {
            _commandDispatcher = cdis;
            _queryDispatcher = qdis;
        }

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

        [HttpGet]
        public async Task<IEnumerable<Chat>> Get(FindChatsByNameQuery request)
        {
            return await _queryDispatcher.Handle<FindChatsByNameQuery, IEnumerable<Chat>>(request);
        }

    }
}