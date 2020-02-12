using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private CommandDispatcher _commandDispatcher;
        private QueryDispatcher _queryDispatcher;
        private readonly IMediator _mediator;

        public ChatsController(CommandDispatcher cdis, QueryDispatcher qdis, IMediator mediator)
        {
            _commandDispatcher = cdis;
            _queryDispatcher = qdis;
            _mediator = mediator;
        }

        [HttpGet("chat/{name}")]
        public async Task<FindChatsByNameResult> Get(string name)
        {
            return await _queryDispatcher.Handle<FindChatsByNameQuery, FindChatsByNameResult>(new FindChatsByNameQuery { Name = name });
        }

        [HttpGet()]
        public async Task<FindChatsByNameResult> Get()
        {
            return await _mediator.Send(new GetAllChatsQuery());
        }

        [HttpPost]
        public async Task<CommandResult> CreateChat(CreateChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

        [HttpPut]
        public async Task<CommandResult> ChangeChatPrivacy(ChangeChatCommand request)
        {
            return await _commandDispatcher.Execute(request);
        }

        [HttpPut]
        [Route("{id}/picture")]
        public async Task<CommandResult> ChangeChatPicture(AddChatPictureCommand request, int id)
        {
            request.Id = id;
            return await _commandDispatcher.Execute(request);
        }

    }
}