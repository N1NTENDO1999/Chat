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

        [HttpGet("chats/{name}")]
        public async Task<FindChatsByNameResult> Get(string name)
        {
            return await _queryDispatcher.Handle<FindChatsByNameQuery, FindChatsByNameResult>(new FindChatsByNameQuery { Name = name });
        }

        [HttpGet()]
        public async Task<FindChatsByNameResult> Get()
        {
            return await _queryDispatcher.Handle<GetAllChatsQuery, FindChatsByNameResult>(new GetAllChatsQuery());
        }

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

        [HttpPut]
        [Route("changeprivacy")]
        public async Task<CommandResult> ChangeChatPrivacy(ChangeChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

    }
}