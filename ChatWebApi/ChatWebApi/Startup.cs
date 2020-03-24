using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using ChatWebApi.Application;
using ChatWebApi.Application.Chats.Commands;
using ChatWebApi.Application.Chats.Queries;
using ChatWebApi.Application.Services;
using ChatWebApi.Application.Tokens.Queries;
using ChatWebApi.Application.UserChats.Commands;
using ChatWebApi.Application.Users.Commands;
using ChatWebApi.Application.Users.Queries;
using ChatWebApi.Infrastructure;
using ChatWebApi.Infrastructure.Entities;
using ChatWebApi.Interfaces.Requests;
using ChatWebApi.SignalR;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

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

			services.AddAutoMapper(typeof(Startup));
			services.AddMediatR(Assembly.GetExecutingAssembly());

			services.AddMvc()
				.SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
				.AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

			services.AddSignalR()
				.AddJsonProtocol(opt => opt.PayloadSerializerSettings.ContractResolver = new DefaultContractResolver());

			var sharedKey = new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes(Configuration["JWTSecurity:Key"]));

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "Chat API", Version = "v1" });

			});


			services.AddCors(options =>
			{
				options.AddPolicy("CorsPolicy",
					builder => builder.AllowAnyOrigin()
					  .AllowAnyMethod()
					  .AllowAnyHeader()
					  .AllowCredentials()
				.Build());
			});

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
				.AddJwtBearer(options =>
				{
					options.TokenValidationParameters = new TokenValidationParameters
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateLifetime = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = Configuration["JWTSecurity:Issuer"],
						ValidAudience = Configuration["JWTSecurity:Audience"],
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWTSecurity:Key"]))
					};
				});

			services.AddAuthentication().AddGoogle(googleOptions =>
			{
				googleOptions.ClientId = Configuration["Authentication:Google:ClientId"];
				googleOptions.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
			});

			services.AddScoped(typeof(ChatContext));
			
			services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
			services.AddHostedService<ScheduledMessagesSender>();

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

			app.UseStaticFiles();

			app.UseSwagger(c => c.RouteTemplate = "swagger/{documentName}/swagger.json");

			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api");
			});
			
			app.UseCors("CorsPolicy");

			app.UseSignalR(routes =>
			{
				routes.MapHub<ChatHub>("/chatHub");
			});

			app.UseHttpsRedirection();
	
			app.UseMvc();
			app.UseAuthentication();


		}
	}
}
