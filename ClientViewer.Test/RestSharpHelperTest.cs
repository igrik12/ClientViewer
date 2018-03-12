using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;
using NUnit.Framework;

namespace Bbr.Euclid.ClientViewer.Test
{
    [TestFixture]
    public class RestSharpHelperTest
    {
        private const string Host = "gbrtebldpw001";
        private const string UserName = "igor.lavrentjev";
        private const string Password = "Smint2013";

        [Test]
        public void GetsDatabasesForAllClientNames()
        {
            var tc = new TeamCityQuery(Host, UserName, Password);
            var rs = new RestSharpHelper(Host,UserName,Password);
            var names = tc.GetAllClientNames();
            var bds = new List<string>();
            names.ForEach(x => bds.Add(rs.GetDatabase(x)));
            Assert.IsTrue(bds.Count > 1);
        }
    }
}