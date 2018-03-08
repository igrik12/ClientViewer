using RestSharp;
using RestSharp.Authenticators;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class RestSharpHelper
    {
        private readonly RestClient _restClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="RestSharpHelper"/> class.
        /// </summary>
        /// <param name="host">The host.</param>
        /// <param name="username">The username.</param>
        /// <param name="password">The password.</param>
        public RestSharpHelper(string host, string username, string password)
        {
            _restClient = new RestClient($"http://{host}")
            {
                Authenticator = new HttpBasicAuthenticator(username, password)
            };
        }

        /// <summary>
        /// Gets the database for a given client name.
        /// </summary>
        /// <param name="name">The name.</param>
        /// <returns></returns>
        public string GetDatabase(string name)
        {
            var firstrequest =
                new RestRequest($"/repository/download/Git_Clients_{name}/.lastSuccessful/{name}Database.json",
                    Method.GET);

            firstrequest.AddHeader("Content-Type", "text/plain");
            firstrequest.AddHeader("Accept", "application/xml");

            var vcsresponse = _restClient.Execute(firstrequest);
            var db = string.IsNullOrWhiteSpace(vcsresponse.Content)
                ? $"Error: failed to retrieve database for {name}"
                : vcsresponse.Content;

            return db;
        }
    }
}