using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Routing;


namespace CompJS_Services
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "compjs-types-get",
                "compjs/{controller}/"
            );
            config.Routes.MapHttpRoute(
                "game-get",
                "game/",
                new { controller = "Games", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-bhv-get",
                "game/{gameId}/bhv",
                new { controller = "BhvCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-gfx-get",
                "game/{gameId}/gfx",
                new { controller = "GfxCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-phys-get",
                "game/{gameId}/phys",
                new { controller = "PhysCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-ent-get",
                "game/{gameId}/ent",
                new { controller = "EntityTypeDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-shader-get",
                "game/{gameId}/shaders",
                new { controller = "Shaders", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-levels-get",
                "game/{gameId}/levels",
                new { controller = "Levels", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-levels-level-get",
                "game/{gameId}/levels/{id}",
                new { controller = "Levels", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );

            config.EnableSystemDiagnosticsTracing();
        }
    }
}