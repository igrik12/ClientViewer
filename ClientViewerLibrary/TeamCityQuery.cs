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

        public List<Project> GetAllProjects()
        {
            var projects = _client.Projects.All();
            return projects;
        } 
        
        public List<Build> GetListOfRunningBuilds()
        {
            return _client.Builds.ByBuildLocator(BuildLocator.RunningBuilds());
        }

        public ArtifactWrapper DownloadConfiguration(string buildConfigId)
        {
            var foundArt =
                _client.Artifacts.ByBuildConfigId(buildConfigId);
            return foundArt;
        }

        public string GetFleetJson(string buildConfigId)
        {
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
    }
}