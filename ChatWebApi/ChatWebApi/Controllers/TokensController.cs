using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Tokens.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TokensController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<GetTokenQueryResult> GetToken(GetTokenQuery request)
        {
            return await _mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpPost("google")]
        public async Task<GetGoogleUserTokenQueryResult> GetGoogleToken(GetGoogleUserTokenQuery request)
        {
            //var result = await _mediator.Send(request);
            //await _mediator.Send(new AddUserToAdminChatCommand { UserId = result.Id });
            return await _mediator.Send(request);
        }

    }
}