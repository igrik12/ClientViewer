using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Timers;
using Nancy.Hosting.Self;
using Newtonsoft.Json;
using Timer = System.Timers.Timer;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class MainEntry : IContext
    {
        #region variables

        private readonly MainConfiguration _config;
        private readonly TeamCityQuery _query;
        private readonly object _lock = new object();
        private readonly Timer _timer;
        private bool _initialFetch = true;
        private NancyHost _host;
        private bool _backedUp = false;

        #endregion

        #region properties

        public Dictionary<string, List<string>> ClientDatabase { get; set; }
        public Dictionary<string, List<string>> BackUpDatabase { get; set; }

        #endregion

        #region construction

        public MainEntry(MainConfiguration config)
        {
            _config = config;
            ClientDatabase = new Dictionary<string, List<string>>();
            BackUpDatabase = new Dictionary<string, List<string>>();
            if (config.LocalDatabases?.Count > 0)
            {
                FetchAllClientsFromLocalDb();
            }
            else
            {
                _query = new TeamCityQuery(_config.Host, _config.UserName, _config.Password);
                FetchAllClients();

                _timer = new Timer
                {
                    Interval = TimeSpan.FromMinutes(10).TotalMilliseconds
                };
                _timer.Elapsed += (sender, args) =>
                {
                    lock (_lock)
                    {
                        FetchAllClients(); 
                        BackUpDatabase = new Dictionary<string, List<string>>(ClientDatabase);
                    }
                };
                _timer.Start();
            }
        }

        #endregion

        #region methods

        public void Start()
        {
            var hostConfigs = new HostConfiguration {UrlReservations = {CreateAutomatically = true}};

            var uriString = "http://localhost:3579";
            var uri = new Uri(uriString);

            using (_host = new NancyHost(uri, new BootStrapper(this), hostConfigs))
            {
                _host.Start();
                Console.WriteLine("Starting up Client Viewer service.");
                Console.WriteLine("Your application is running on " + uri);
                Console.WriteLine("Press any [Enter] to close the host.");
                Console.ReadLine();
            }
        }

        public void Stop()
        {
            _timer.Stop();
            _host.Stop();
            Console.WriteLine("Stopped Client Viewer service...");
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

                if (!_backedUp)
                {
                    BackUpDatabase = new Dictionary<string, List<string>>(ClientDatabase);
                    _backedUp = true;
                }
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


        #endregion

        #region event methods

        #endregion

        #region overrides

        #endregion
    }
}