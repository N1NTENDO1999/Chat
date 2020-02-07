using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Application.UserChats.Commands;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Application.Users.Queries;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ChatWebApi
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ChatContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ClockSkew = TimeSpan.FromMinutes(5),

						//IssuerSigningKey = signingKey,
						RequireSignedTokens = true,

						RequireExpirationTime = true,
						ValidateLifetime = true,

						ValidateAudience = true,
						ValidAudience = "api://default",

						ValidateIssuer = true,
						ValidIssuer = "https://{yourOktaDomain}/oauth2/default"
					};
				});

			services.AddScoped(typeof(ChatContext));

			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

			services.AddScoped(typeof(CommandDispatcher));
			services.AddScoped(typeof(QueryDispatcher));

			services.AddScoped(typeof(ICommandHandler<CreateChatCommand>), typeof(CreateChatCommandHandler));
			services.AddScoped(typeof(ICommandHandler<ChangeChatCommand>), typeof(ChangeChatCommandHandler));
			services.AddScoped(typeof(ICommandHandler<AddChatPictureCommand>), typeof(AddChatPictureCommandHandler));
			services.AddScoped(typeof(ICommandHandler<CreateUserCommand>), typeof(CreateUserCommandHandler));
			services.AddScoped(typeof(ICommandHandler<AddUserToChatCommand>), typeof(AddUserToChatCommandHandler));

			services.AddScoped(typeof(IQueryHandler<FindChatsByNameQuery, FindChatsByNameResult>), typeof(FindChatsByNameQueryHandler));
			services.AddScoped(typeof(IQueryHandler<GetAllChatsQuery, FindChatsByNameResult>), typeof(GetAllChatsQueryHandler));
			services.AddScoped(typeof(IQueryHandler<GetAllUsersQuery, UsersQueryResult>), typeof(GetAllUsersQueryHandler));
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}

			

			app.UseHttpsRedirection();
			app.UseMvc();
		}
	}
}
