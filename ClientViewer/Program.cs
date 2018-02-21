using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;

namespace Bbr.Euclid.ClientViewer
{
    class Program
    {
        static void Main(string[] args)
        {
            //var config = new MainConfiguration()
            //{
            //    Clients = new Dictionary<string, List<string>>()
            //    {
            //        {
            //            "Kaneko", new List<string>()
            //            {
            //                "Git_Euclid_IntegrationTesting_Clients_Kaneko_JREast_JREastDatabase",
            //                "Git_Clients_Kaneko_Vehicles_Tokyu_TokyuDatabase"
            //            }
            //        },
            //        {
            //            "HS1", new List<string>()
            //            {
            //                "Git_Euclid_IntegrationTesting_Clients_Hs1_HS1Database_2"
            //            }
            //        }
            //    }
            //};

            var config = new MainConfiguration()
            {
                LocalDatabases = new Dictionary<string, List<string>>()
                {
                    {"Bombardier", new List<string>() {"C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"}},
                    {"TestClient", new List<string>() {"C:\\SourceCode\\ClientViewer\\TestClientDatabase.json"}}
                }
            };

            new MainEntry(config).StartHost();
        }
    }
}