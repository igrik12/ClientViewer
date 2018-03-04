using System;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Json;
using Nancy.TinyIoc;

namespace Bbr.Euclid.ClientViewerLibrary
{
    /// <summary>
    /// The main bootstrapped for the Client Viewer service. 
    /// </summary>
    /// <seealso cref="Nancy.DefaultNancyBootstrapper" />
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
}