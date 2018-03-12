using System.Collections.Generic;
using System.Linq;
using Bbr.Euclid.ClientViewerLibrary;
using NUnit.Framework;
using TeamCitySharp.DomainEntities;

namespace Bbr.Euclid.ClientViewer.Test
{
    [TestFixture]
    public class TeamCitySharpClientTest
    {
        private const string Host = "gbrtebldpw001";
        private const string UserName = "igor.lavrentjev";
        private const string Password = "Smint2013";
        private const string JrEastConfigId = "Git_Euclid_IntegrationTesting_Clients_Kaneko_JREast_JREastDatabase";

        [Test]
        public void GetAllProjectsReturnsAll()
        {
            var query = new TeamCitySharpClient(Host, UserName, Password);
            List<Project> projects = query.GetAllProjects();
            Assert.IsTrue(projects != null);
            Assert.IsTrue(projects.Count > 0);
        }

        [Test]
        public void GetAllClientNamesReturnsSome()
        {
            var query = new TeamCitySharpClient(Host, UserName, Password);
            var found = query.GetAllClientNames("Clients");
            Assert.IsTrue(found.Count > 1);
            Assert.IsTrue(found.Any(x => x.Equals("Bombardier") || x.Equals("Kaneko")));  
        }

        [Test]
        public void GetListOfRunningBuildsReturnsSomeOrEmpty()
        {
            var query = new TeamCitySharpClient(Host, UserName, Password);
            var builds = query.GetListOfRunningBuilds();

            query.DownloadConfiguration(JrEastConfigId);
            Assert.IsTrue(builds != null);
        }

        [Test]
        public void GetJrEastFleetJson()
        {
            var query = new TeamCitySharpClient(Host, UserName, Password);
            var fleet = query.GetDatabaseJsonById(JrEastConfigId);
            Assert.NotNull(fleet);
        }

        [Test]
        public void GetBombardierDatabaseByConfigName()
        {
            var query = new TeamCitySharpClient(Host, UserName, Password);
            var ret = query.GetDatabaseJsonByConfigName("Bombardier");
            Assert.NotNull(ret);
        }
        
    }
}