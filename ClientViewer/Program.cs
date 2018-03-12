using System;
using Bbr.Euclid.ClientViewerLibrary;

namespace Bbr.Euclid.ClientViewer
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            var config = args.Length > 0
                ? new MainConfiguration()
                {
                    UserName = args[0],
                    Password = args[1],
                    MainClientProjectName = args.Length == 3 ? args[2] : "Clients"
                }
                : new MainConfiguration();

            //var config = new MainConfiguration()
            //{
            //    LocalDatabases = new Dictionary<string, string>()
            //    {
            //        {"Bombardier","C:\\Databases\\BombardierDatabase.json"},
            //        {"Kaneko","C:\\Databases\\KanekoDatabase.json"}
            //    }
            //}; 


            ConfigureService.Configure(config);
        }
    }
}