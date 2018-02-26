using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using Nancy.Hosting.Self;
using Newtonsoft.Json;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class MainEntry : IContext
    {
        #region variables

        private readonly MainConfiguration _config;
        private readonly TeamCityQuery _query;
        private readonly object _lock = new object();
        private bool _initialFetch = true;

        #endregion

        #region properties

        public Dictionary<string, List<string>> ClientDatabase { get; set; }


        #endregion

        #region construction

        public MainEntry(MainConfiguration config)
        {
            _config = config;
            ClientDatabase = new Dictionary<string, List<string>>();
            if (config.LocalDatabases?.Count > 0)
            {
                FetchAllClientsFromLocalDb();
            }
            else
            {
                _query = new TeamCityQuery(_config.Host, _config.UserName, _config.Password);
                FetchAllClients();
            }

            PollDatabase();
        }

        #endregion

        #region methods

        public void StartHost()
        {
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
            if (!_initialFetch)
            {
                ClientDatabase = new Dictionary<string, List<string>>();
            }
            foreach (var client in _config.Clients)
            {
                var fleets = client.Value.Select(x => _query.GetFleetJson(x)).ToArray();
                if (!fleets.Any())
                {
                    continue;
                }
                ClientDatabase.Add(client.Key, fleets.ToList());
            }
            _initialFetch = false;
        }

        /// <summary>
        /// Fetches all clients from local database.Test
        /// </summary>
        private void FetchAllClientsFromLocalDb()
        {
            foreach (var local in _config.LocalDatabases)
            {
                var fleets = local.Value.Select(File.ReadAllText).ToList();
                if(!fleets.Any())
                {
                  continue;  
                }
                ClientDatabase.Add(local.Key, fleets);
            }
        }

        private void PollDatabase()
        {        
            new Thread(() =>
            {
                lock (_lock)
                {
                    while (true)
                    {
                        Thread.Sleep(100000);
                        FetchAllClients();
                    }
                }
            }).Start();
        }


        #endregion

        #region event methods

        #endregion

        #region overrides

        #endregion
    }
}