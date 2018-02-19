using System;
using System.Collections.Generic;
using System.Linq;
using Nancy.Hosting.Self;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class MainEntry : IContext
    {
        #region variables

        private readonly MainConfiguration _config;
        private readonly TeamCityQuery _query;

        #endregion

        #region properties

        public Dictionary<string, List<string>> ClientDatabase { get; set; } = new Dictionary<string, List<string>>();

        #endregion

        #region construction

        public MainEntry(MainConfiguration config)
        {
            _config = config;
            _query = new TeamCityQuery(_config.Host, _config.UserName, _config.Password);
        }

        #endregion

        #region methods

        public void StartHost()
        {
            FetchAllClients();

            var hostConfigs = new HostConfiguration {UrlReservations = {CreateAutomatically = true}};

            var uriString = "http://localhost:3579";
            var uri = new Uri(uriString);

            using (var host = new NancyHost(uri, new BootStrapper(this), hostConfigs))
            {
                host.Start();

                Console.WriteLine("Your application is running on " + uri);
                Console.WriteLine("Press any [Enter] to close the host.");
                Console.ReadLine();
            }
        }

        /// <summary>
        /// Fetches all fleets.
        /// </summary>
        private void FetchAllClients()
        {
            foreach (var client in _config.Clients)
            {
                var fleets = client.Value.Select(x => _query.GetFleetJson(x)).ToArray();
                if (!fleets.Any())
                {
                    continue;
                }
                ClientDatabase.Add(client.Key, fleets.ToList());
            }
        }

        #endregion

        #region event methods

        #endregion

        #region overrides

        #endregion
    }
}