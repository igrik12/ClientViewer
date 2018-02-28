using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;
using Topshelf;

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
            //                "Git_Clients_Kaneko"
            //            }
            //        },
            //        {
            //            "Bombardier", new List<string>()
            //            {
            //                "Git_Clients_Bombardier"
            //            }
            //        }
            //    }
            //};


            var config = new MainConfiguration()
            {
                LocalDatabases = new Dictionary<string, List<string>>()
                {
                    {"Bombardier", new List<string>() {"C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"}},
                    {"Bombardier2", new List<string>() {"C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"}}
                }
            };

            HostFactory.Run(x =>
            {
                x.Service<MainEntry>(s =>
                {
                    s.ConstructUsing(name => new MainEntry(config));
                    s.WhenStarted(tc => tc.Start());
                    s.WhenStopped(tc => tc.Stop());
                });

                x.RunAsLocalSystem();
                x.SetDescription("Client-Viewer-SelfHost Service");
                x.SetDisplayName("Client-Viewer-SelfHost Service");
                x.SetServiceName("Client-Viewer Service");
            });


            //new MainEntry(config).StartHost();
        }
    }
}