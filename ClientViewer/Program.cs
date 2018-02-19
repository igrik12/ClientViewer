using System;
using System.Collections.Generic;
using Bbr.Euclid.ClientViewerLibrary;
using Nancy;
using Nancy.Hosting.Self;

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
                            "Git_Euclid_IntegrationTesting_Clients_Kaneko_JREast_JREastDatabase",
                            "Git_Clients_Kaneko_Vehicles_Tokyu_TokyuDatabase"
                        }
                    },
                    {
                        "HS1", new List<string>()
                        {
                            "Git_Euclid_IntegrationTesting_Clients_Hs1_HS1Database_2"
                        }
                    }
                }
            };
            new MainEntry(config).StartHost();
        }
    }
}