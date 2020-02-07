using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Tokens.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        private CommandDispatcher _commandDispatcher;
        private QueryDispatcher _queryDispatcher;

        public TokensController(CommandDispatcher cdis, QueryDispatcher qdis)
        {
            _commandDispatcher = cdis;
            _queryDispatcher = qdis;
        }

        [AllowAnonymous]
        [HttpPost("get/token")]
        public async Task<GetTokenQueryResult> GetToken(GetTokenQuery request)
        {
            return await _queryDispatcher.Handle<GetTokenQuery, GetTokenQueryResult>(request);
        }
    }
}