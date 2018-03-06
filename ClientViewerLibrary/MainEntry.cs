using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bbr.Euclid.ClientViewerLibrary.Extensions;
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

        #endregion

        #region properties

        public int RefreshInterval { get; set; }
        public List<ClientWrapper> ClientWrappers { get; set; }
        private readonly bool _testMode;
        private Timer _refreshTimer;
        public RefreshStatus RefreshStatus { get; set; }

        #endregion

        #region construction

        /// <summary>
        /// Initializes a new instance of the <see cref="MainEntry"/> class.
        /// </summary>
        /// <param name="config">The configuration.</param>
        public MainEntry(MainConfiguration config)
        {
            _config = config;
            ClientWrappers = new List<ClientWrapper>();
            RefreshStatus = new RefreshStatus(DateTime.Now, DateTime.Now + TimeSpan.FromMinutes(RefreshInterval))
            {
                TimeTillNextRefresh = DateTime.Now + TimeSpan.FromMinutes(RefreshInterval) - DateTime.Now
            };
            if (config.LocalDatabases?.Count > 0)
            {
                FetchAllClientsFromLocalDb();
                _testMode = true;
            }
            else
            {
                _query = new TeamCityQuery(_config.Host, _config.UserName, _config.Password);
                FetchAllClients();
                SetUpdateInterval(60);
            }

            StartRefreshTimer();
        }

        /// <summary>
        /// Starts this instance.
        /// </summary>
        public void Start()
        {
            var hostConfigs = new HostConfiguration {UrlReservations = {CreateAutomatically = true}};

            var uriString = "http://localhost:8888";
            var uri = new Uri(uriString);

            _host = new NancyHost(uri, new BootStrapper(this), hostConfigs);
            _host.Start();
            Console.WriteLine($"Running Client-Viewer on {uriString}");
            Console.ReadLine();
        }

        public void Stop()
        {
            _timer.Dispose();
            _host.Stop();
            Console.WriteLine("Stopped Client Viewer service...");
        }


        /// <summary>
        /// Sets the update interval.
        /// </summary>
        /// <param name="intervalInSeconds">The interval in seconds.</param>
        public void SetUpdateInterval(int intervalInSeconds)
        {
            if (_testMode) return;
            RefreshInterval = intervalInSeconds;
            if (RefreshInterval < 10) RefreshInterval = 10;
            if (_timer == null)
            {
                _timer = new Timer
                {
                    Interval = TimeSpan.FromMinutes(RefreshInterval).TotalMilliseconds
                };
                _timer.Elapsed += (sender, args) =>
                {
                    lock (_lock)
                    {
                        FetchAllClients();
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

        /// <summary>
        /// Starts the refresh timer.
        /// </summary>
        private void StartRefreshTimer()
        {
            _refreshTimer = new Timer {Interval = TimeSpan.FromSeconds(1).TotalMilliseconds};
            _refreshTimer.Elapsed += (sender, args) =>
            {
                if (RefreshStatus.TimeTillNextRefresh.TotalMinutes <= 0)
                {
                    RefreshStatus.LastRefresh = RefreshStatus.NextRefresh;
                    RefreshStatus.NextRefresh += TimeSpan.FromMinutes(RefreshInterval);
                    RefreshStatus.TimeTillNextRefresh = TimeSpan.Zero;
                }

                RefreshStatus.TimeTillNextRefresh = RefreshStatus.NextRefresh - args.SignalTime;
            };
            _refreshTimer.Start();
        }

        /// <summary>
        /// Refreshes the client database.
        /// </summary>
        /// <param name="clientName">Name of the client.</param>
        /// <returns></returns>
        public List<ClientWrapper> RefreshClientDatabase(string clientName)
        {
            // TODO remove after testing
            if (_testMode)
            {
                return ClientWrappers;
            }

            var found = ClientWrappers.FirstOrDefault(x => x.Name.ToLower().Equals(clientName.ToLower()));

            if (found == null) return ClientWrappers;

            found.Fleets = JsonConvert.DeserializeObject(_query.GetDatabaseJsonByConfigName(clientName));

            return ClientWrappers;
        }

        /// <summary>
        /// Refreshes the database.
        /// </summary>
        /// <returns></returns>
        public List<ClientWrapper> RefreshDatabase()
        {
            // TODO remove after testing
            if (_testMode)
            {
                return ClientWrappers;
            }

            FetchAllClients();
            return ClientWrappers;
        }

        #endregion

        #region methods

        /// <summary>
        /// Fetches all fleets.
        /// </summary>
        private void FetchAllClients()
        {
            if (!_initialFetch)
            {
                ClientWrappers.RemoveAll(x => _config.Clients.ContainsKey(x.Name));
            }

            foreach (var client in _config.Clients)
            {
                var found = _query.GetDatabaseJsonByConfigName(client.Value);

                if (found.ToLower().Contains("error"))
                {
                    continue;;
                }

                var fleets = JsonConvert.DeserializeObject(found);

                if (fleets == null)
                {
                    continue;
                }

                ClientWrappers.Add(new ClientWrapper(client.Key, fleets, RefreshStatus));
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

                ClientWrappers.Add(new ClientWrapper(local.Key, fleets, RefreshStatus));
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

            var retrieved = _query.GetDatabaseJsonByConfigName(name);
            if (retrieved.ToLower().Contains("error"))
            {
                return $"Error : Failed to find {name} client .";
            }

            var fleets = JsonConvert.DeserializeObject(retrieved);
            if (fleets == null)
            {
                return $"Error : Failed to retrieve {name} database from TeamCity";
            }

            if (!ClientWrappers.Any(x => x.Name.ToLower().Equals(name)))
            {
                ClientWrappers.Add(new ClientWrapper(name, fleets,
                    new RefreshStatus(RefreshStatus.LastRefresh,
                        RefreshStatus.NextRefresh)));
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