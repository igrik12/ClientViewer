using System.IO;
using NUnit.Framework;

namespace Bbr.Euclid.ClientViewer.Test
{
    [TestFixture]
    public class DatabaseLoaderTest
    {
        [OneTimeSetUp]
        public void Setup()
        {
            Directory.SetCurrentDirectory(TestContext.CurrentContext.TestDirectory);
        }
        [Test]
        public void FetchClientsReturnsThree()
        {
            //var dbLoader = new DatabaseQuery();
            //var result = dbLoader.FetchClients();
            //Assert.AreEqual(3, result.Count());
        }
    }
}
