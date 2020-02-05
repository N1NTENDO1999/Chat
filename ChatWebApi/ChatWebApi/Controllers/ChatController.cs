using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
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

        public ChatController(CommandDispatcher cdis)
        {
            _commandDispatcher = cdis;
        }

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

        [HttpGet]
        public string Get()
        {
            return "Fuck";
        }

    }
}