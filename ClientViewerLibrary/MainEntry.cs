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
        private Timer _timer;
        private bool _initialFetch = true;
        private NancyHost _host;
        private bool _backedUp;

        #endregion

        #region properties

        public JavaScriptSerializer JavaScriptSerializer { get; set; }
        public Dictionary<string, object> ClientDatabase { get; set; }
        public Dictionary<string, object> BackUpDatabase { get; set; }
        private readonly bool _testMode;

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
                _testMode = true;
            }
            else
            {
                _query = new TeamCityQuery(_config.Host, _config.UserName, _config.Password);
                FetchAllClients();
                SetUpdateInterval(10);
            }
        }

        public void SetUpdateInterval(int intervalInSeconds)
        {
            if (_testMode) return;

            if (intervalInSeconds < 10) intervalInSeconds = 10;
            if (_timer == null)
            {
                _timer = new Timer
                {
                    Interval = TimeSpan.FromMinutes(intervalInSeconds).TotalMilliseconds
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
            else
            {
                _timer.Stop();
                _timer.Interval = intervalInSeconds;
                _timer.Start();
            }
        }

        public Dictionary<string, object> RefreshClientDatabase(string clientName)
        {
            // TODO remove after testing
            if (_testMode)
            {
                return ClientDatabase;
            }
            if (!ClientDatabase.ContainsKey(clientName)) return ClientDatabase;
            ClientDatabase[clientName] = JsonConvert.DeserializeObject(_query.GetDatabaseJsonByConfigName(clientName));
            return ClientDatabase;
        }

        public Dictionary<string, object> RefreshDatabase()
        {
            // TODO remove after testing
            if (_testMode)
            {
                return ClientDatabase;
            }
            FetchAllClients();
            return ClientDatabase;
        }

        #endregion

        #region methods

        public void Start()
        {
            var hostConfigs = new HostConfiguration {UrlReservations = {CreateAutomatically = true}};

            var uriString = "http://localhost:3579";
            var uri = new Uri(uriString);

            this._host = new NancyHost(uri, new BootStrapper(this), hostConfigs);
            this._host.Start();
            Console.WriteLine($"Running Client-Viewer on {uriString}");
        }

        public void Stop()
        {
            _timer.Dispose();
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

                if (fleets == null)
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
            //TODO This is temporary for testing with local DB
            if (_query == null)
            {
                return "Error : TeamCityQuery has not been initialised. Probably running local DB";
            }
            var fleets = _query.GetDatabaseJsonByConfigName(name);

            if (string.IsNullOrWhiteSpace(fleets) || fleets.ToLower().Contains("error"))
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