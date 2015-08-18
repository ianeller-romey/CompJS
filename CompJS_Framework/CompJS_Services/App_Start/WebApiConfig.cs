using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;


namespace CompJS_Services
{
    public static class WebApiConfig
    {
        public const string DEFAULT_ROUTE_NAME = "CompJSRoute";
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: DEFAULT_ROUTE_NAME,
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.EnableSystemDiagnosticsTracing();
        }
    }
}