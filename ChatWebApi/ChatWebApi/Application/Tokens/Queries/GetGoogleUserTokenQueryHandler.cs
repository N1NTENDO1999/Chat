using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Newtonsoft.Json;

namespace ChatWebApi.Application.Tokens.Queries
{
	public class GetGoogleUserTokenQuery : IRequest<GetGoogleUserTokenQueryResult>
	{
        public string Token { get; set; }
    }

	public class GetGoogleUserTokenQueryResult
	{
		public string Token { get; set; }
		public string Email { get; set; }
	}

	public class GetGoogleUserTokenQueryHandler : IRequestHandler<GetGoogleUserTokenQuery, GetGoogleUserTokenQueryResult>
	{
		private const string GoogleApiTokenInfoUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={0}";

		public async Task<GetGoogleUserTokenQueryResult> Handle(GetGoogleUserTokenQuery request, CancellationToken cancellationToken)
		{
            var httpClient = new HttpClient();
            var requestUri = new Uri(string.Format(GoogleApiTokenInfoUrl, request.Token));

            HttpResponseMessage httpResponseMessage = await httpClient.GetAsync(requestUri);
            
            if (httpResponseMessage.StatusCode != HttpStatusCode.OK)
            {
                return null;
            }

            var response = await httpResponseMessage.Content.ReadAsStringAsync();
            var googleApiTokenInfo = JsonConvert.DeserializeObject<GoogleApiTokenInfo>(response);

            return new GetGoogleUserTokenQueryResult { Email = googleApiTokenInfo.email };
        }
	}
}
