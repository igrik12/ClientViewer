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
            //    Clients = new Dictionary<string, string>()
            //    {
            //        {"Kaneko", "Git_Clients_Kaneko"},
            //        //{"Bombardier", "Git_Clients_Bombardier"}
            //    }
            //};

            var config = new MainConfiguration()
            {
                LocalDatabases = new Dictionary<string, string>()
                {
                    {"Bombardier", "C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"},
                    {"Bombardier2", "C:\\SourceCode\\ClientViewer\\BombardierDatabase.json"}
                }
            };

            ConfigureService.Configure(config);
        }
    }
}