using System;
using System.Collections.Generic;
using System.IO;
using Nancy.Hosting.Self;
using Nancy.Json;
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

        public JavaScriptSerializer JavaScriptSerializer { get; set; }
        public Dictionary<string, object> ClientDatabase { get; set; }
        public Dictionary<string, object> BackUpDatabase { get; set; }

        #endregion

        #region construction

        public MainEntry(MainConfiguration config)
        {
            _config = config;
            ClientDatabase = new Dictionary<string, object>();
            BackUpDatabase = new Dictionary<string, object>();
            JavaScriptSerializer = new JavaScriptSerializer();
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
                        BackUpDatabase = new Dictionary<string, object>(ClientDatabase);
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
                ClientDatabase = new Dictionary<string, object>();
            }
            foreach (var client in _config.Clients)
            {
                var fleets = JsonConvert.DeserializeObject(_query.GetDatabaseJsonById(client.Value));
                if (fleets == null)
                {
                    continue;
                }

                if (!ClientDatabase.ContainsKey(client.Key))
                {
                    ClientDatabase.Add(client.Key, fleets);
                }

                if (!_backedUp)
                {
                    BackUpDatabase = new Dictionary<string, object>(ClientDatabase);
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
                var fleets = JsonConvert.DeserializeObject(File.ReadAllText(local.Value));

                if(fleets == null)
                {
                  continue;  
                }
                ClientDatabase.Add(local.Key, fleets);
            }
        }

        /// <summary>
        /// Adds a new client to the database by running a query from CI with a given client name.
        /// </summary>
        /// <param name="name">The name of the client.</param>
        /// <returns></returns>
        public string AddClientByName(string name)
        {
            var fleets = _query.GetDatabaseJsonByConfigName(name);

            if (string.IsNullOrWhiteSpace(fleets) ||fleets.ToLower().Contains("error"))
            {
                return fleets;
            }
            var fleetsDeserialized = JsonConvert.DeserializeObject(fleets);
            if (fleetsDeserialized == null)
            {
                return string.Empty;
            }

            if (!ClientDatabase.ContainsKey(name))
            {
                ClientDatabase.Add(name, fleetsDeserialized);
            }
            return "";
        }


        #endregion

        #region event methods

        #endregion

        #region overrides

        #endregion
    }
}