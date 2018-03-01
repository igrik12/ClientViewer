using System.Collections.Generic;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class ClientBlob
    {
        public string Name { get; set; }
        public List<Fleet> Fleets { get; set; } = new List<Fleet>();
    }

    public class Fleet
    {
        public string Name => FleetConstants?.Name ?? string.Empty;
        public ObjectWithName FleetConstants { get; set; }
        public List<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    }

    public class Vehicle
    {
        public string Name => VehicleConstants?.VehicleName ?? string.Empty;
        public ObjectWithVehicleName VehicleConstants { get; set; }
        public List<Product> Products { get; set; } = new List<Product>();
    }

    public class Product
    {
        public string Name => Identity?.Name ?? string.Empty;
        public ObjectWithName Identity { get; set; }
        public List<Framework> Frameworks { get; set; } = new List<Framework>();
    }

    public class Framework
    {
        public string Name => Identity?.Name ?? string.Empty;
        public ObjectWithName Identity { get; set; }
        public List<PluginConfiguration> PluginConfigurations { get; set; } = new List<PluginConfiguration>();
    }

    public class PluginConfiguration
    {
        public string Name => Identity?.Name ?? string.Empty;
        public ObjectWithName Identity { get; set; }
    }

    public class ObjectWithName
    {
        public string Name { get; set; }
    }

    public class ObjectWithVehicleName
    {
        public string VehicleName { get; set; }
    }
}