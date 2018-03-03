using System.Collections.Generic;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Json;
using Nancy.TinyIoc;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class BootStrapper : DefaultNancyBootstrapper
    {
        private readonly IContext _content;

        public BootStrapper(IContext content)
        {
            _content = content;
        }

        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            base.ApplicationStartup(container, pipelines);
            container.Register(_content);
        }
    }

    public interface IContext
    {
        JavaScriptSerializer JavaScriptSerializer { get; set; }
        Dictionary<string, object> ClientDatabase { get; set; }
        Dictionary<string, object> BackUpDatabase { get; set; }
        string AddClientByName(string name);
        void SetUpdateInterval(int intervalInSeconds);
        Dictionary<string, object> RefreshClientDatabase(string clientName);
    }
}