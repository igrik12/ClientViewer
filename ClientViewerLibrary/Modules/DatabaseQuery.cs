using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Nancy;
using Nancy.Extensions;
using Nancy.IO;
using Nancy.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class DatabaseQuery : NancyModule
    {
        public DatabaseQuery(IContext context) : base("Clients")
        {
            Get("Get", _ => context.ClientDatabase);
            Get("Contains/{name}", _ => context.ClientDatabase.ContainsKey((string)_.name));
            Get("Remove/{name}", _ =>
            {
                context.ClientDatabase.Remove((string) _.name);
                return context.ClientDatabase;
            });

            Post("AddClient", _ =>
            {
                var jsonString = RequestStream.FromStream(Request.Body).AsString();
                var obj = JsonConvert.DeserializeObject(jsonString);
                var newClient = (IDictionary<string, object>)context.JavaScriptSerializer.DeserializeObject(obj.ToString());
                if(!context.ClientDatabase.ContainsKey(newClient["name"].ToString()))
                {

                    List<object> myDeserializedObjList = ((Nancy.Json.Simple.JsonArray) newClient["fleets"]).ToList();

                    var keys = ((Nancy.Json.Simple.JsonObject) myDeserializedObjList[0]).Keys;
                    var values = ((Nancy.Json.Simple.JsonObject) myDeserializedObjList[0]).Values;
                    //context.ClientDatabase.Add(newClient["name"].ToString(), myDeserializedObjList.ToList().Cast<List<>>());
                }         
                return true;
            });
        }

    }
}