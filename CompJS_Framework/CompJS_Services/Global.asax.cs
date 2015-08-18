using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Windows;

using FastMapper;

using Newtonsoft.Json.Serialization;


namespace CompJS_Services
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {
            // areas
            AreaRegistration.RegisterAllAreas();

            // routes
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            // formatters
            var formatters = GlobalConfiguration.Configuration.Formatters;
            formatters.Remove(formatters.XmlFormatter);

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}