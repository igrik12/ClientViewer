using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TeamCitySharp;
using TeamCitySharp.ActionTypes;
using TeamCitySharp.DomainEntities;
using TeamCitySharp.Locators;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class TeamCityQuery
    {
        private readonly TeamCityClient _client;

        // Initialised TeamCityQuery class which requires host, username and password
        public TeamCityQuery(string host, string username, string password)
        {
            _client = new TeamCityClient(host);
            _client.Connect(username, password);
        }

        /// <summary>
        /// Gets all projects.
        /// </summary>
        /// <returns></returns>
        public List<Project> GetAllProjects()
        {
            var projects = _client.Projects.All();
            return projects;
        }

        /// <summary>
        /// Gets the list of running builds.
        /// </summary>
        /// <returns></returns>
        public List<Build> GetListOfRunningBuilds()
        {
            return _client.Builds.ByBuildLocator(BuildLocator.RunningBuilds());
        }

        /// <summary>
        /// Downloads the configuration.
        /// </summary>
        /// <param name="buildConfigId">The build configuration identifier.</param>
        /// <returns></returns>
        public ArtifactWrapper DownloadConfiguration(string buildConfigId)
        {
            var foundArt =
                _client.Artifacts.ByBuildConfigId(buildConfigId);
            return foundArt;
        }

        /// <summary>
        /// Gets the database json by identifier.
        /// </summary>
        /// <param name="buildConfigId">The build configuration identifier.</param>
        /// <returns></returns>
        public string GetDatabaseJsonById(string buildConfigId)
        {
            if (string.IsNullOrWhiteSpace(buildConfigId))
            {
                throw new ArgumentNullException(nameof(buildConfigId));
            }
            var foundArtifact = _client.Artifacts.ByBuildConfigId(buildConfigId);
            var lastSuccessful = foundArtifact.LastSuccessful();
            string fleet;
            using (var wc = new WebClient())
            {
                var foundDb = lastSuccessful.Download()
                    .FirstOrDefault(x => x.ToLower().Contains("database") && x.ToLower().Contains(".json"));

                fleet = string.IsNullOrWhiteSpace(foundDb) ? string.Empty : wc.DownloadString(foundDb);
            }

            return fleet;
        }

        /// <summary>
        /// Gets database json by configuration name.
        /// </summary>
        /// <param name="configName">Name of the configuration.</param>
        /// <returns></returns>
        public string GetDatabaseJsonByConfigName(string configName)
        {
            if (string.IsNullOrWhiteSpace(configName))
            {
                throw new ArgumentNullException(nameof(configName));
            }

            return GetDatabaseJsonById(_client.BuildConfigs.ByConfigurationName(configName).Id);
        }
    }
}