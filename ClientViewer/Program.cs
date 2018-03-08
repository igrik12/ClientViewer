using System.Collections.Generic;
using System.IO;
using Bbr.Euclid.ClientViewerLibrary;
using Topshelf;

namespace Bbr.Euclid.ClientViewer
{
    class Program
    {
        static void Main(string[] args)
        {
            var config = args.Length == 3
                ? new MainConfiguration()
                {
                    Host = args[0],
                    UserName = args[1],
                    Password = args[2],
                    Clients = new Dictionary<string, string>()
                    {
                        {"Kaneko", "Kaneko"},
                        {"Bombardier", "Bombardier"}
                    }
                }
                : new MainConfiguration()
                {
                    Clients = new Dictionary<string, string>()
                    {
                        {"Kaneko", "Kaneko"},
                        {"Bombardier", "Bombardier"}
                    }
                };


            //var config = new MainConfiguration()
            //{
            //    LocalDatabases = new Dictionary<string, string>()
            //    {
            //        {"Bombardier","C:\\Databases\\BombardierDatabase.json"},
            //        {"BombaClone","C:\\Databases\\BombardierDatabase.json"}
            //    }
            //};

            ConfigureService.Configure(config);
        }
    }
}