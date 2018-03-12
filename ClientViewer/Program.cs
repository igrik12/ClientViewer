using System;
using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;

namespace Bbr.Euclid.ClientViewer
{
    class Program
    {
        [STAThread]
        static void Main(string[] args)
        {
            //var config = new MainConfiguration();

            var config = new MainConfiguration()
            {
                LocalDatabases = new Dictionary<string, string>()
                {
                    {"Bombardier","C:\\Databases\\BombardierDatabase.json"},
                    {"Kaneko","C:\\Databases\\KanekoDatabase.json"}
                }
            };


            ConfigureService.Configure(config);
        }
    }
}