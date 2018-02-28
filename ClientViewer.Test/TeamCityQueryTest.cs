using Bbr.Euclid.ClientViewerLibrary;
using NUnit.Framework;

namespace Bbr.Euclid.ClientViewer.Test
{
    [TestFixture]
    public class TeamCityQueryTest
    {
        private const string Host = "gbqmhbldpw004:8001";
        private const string UserName = "igor.lavrentjev";
        private const string Password = "Smint1985";
        private const string JrEastConfigId = "Git_Euclid_IntegrationTesting_Clients_Kaneko_JREast_JREastDatabase";

        [Test]
        public void GetAllProjectsReturnsAll()
        {
            var query = new TeamCityQuery(Host, UserName, Password);
            var projects = query.GetAllProjects();
            Assert.IsTrue(projects != null);
            Assert.IsTrue(projects.Count > 0);
        }

        [Test]
        public void GetListOfRunningBuildsReturnsSomeOrEmpty()
        {
            var query = new TeamCityQuery(Host, UserName, Password);
            var builds = query.GetListOfRunningBuilds();

            query.DownloadConfiguration(JrEastConfigId);
            Assert.IsTrue(builds != null);
        }

        [Test]
        public void GetJrEastFleetJson()
        {
            var query = new TeamCityQuery(Host, UserName, Password);
            var fleet = query.GetDatabaseJsonById(JrEastConfigId);
            Assert.NotNull(fleet);
        }

        [Test]
        public void GetBombardierDatabaseByConfigName()
        {
            var query = new TeamCityQuery(Host, UserName, Password);
            var ret = query.GetDatabaseJsonByConfigName("Bombardier");
            Assert.NotNull(ret);
        }
    }
}