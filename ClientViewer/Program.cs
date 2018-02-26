using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;

namespace Bbr.Euclid.ClientViewer
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = new MainConfiguration()
            {
                Clients = new Dictionary<string, List<string>>()
                {
                    {
                        "Kaneko", new List<string>()
                        {
                            "Git_Clients_Kaneko"
                        }
                    },
                    {
                        "Bombardier", new List<string>()
                        {
                            "Git_Clients_Bombardier"
                        }
                    }
                }
            };

            //var config = new MainConfiguration()
            //{
            //    LocalDatabases = new Dictionary<string, List<string>>()
            //    {
            //        {"Bombardier", new List<string>() {"C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"}},
            //        {"TestClient", new List<string>() {"C:\\SourceCode\\ClientViewer\\TestClientDatabase.json"}}
            //    }
            //};

            new MainEntry(config).StartHost();
        }
    }
}