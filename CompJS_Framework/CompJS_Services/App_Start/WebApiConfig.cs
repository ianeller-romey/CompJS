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
                "game/bhv/{gameId}",
                new { controller = "BhvCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-gfx-get",
                "game/gfx/{gameId}",
                new { controller = "GfxCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-phys-get",
                "game/phys/{gameId}",
                new { controller = "PhysCompDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-ent-get",
                "game/ent/{gameId}",
                new { controller = "EntityTypeDefinitions", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-shader-get",
                "game/shaders/{gameId}",
                new { controller = "Shaders", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-levels-get",
                "game/levels/{gameId}",
                new { controller = "Levels", action = "GetForGame" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );
            config.Routes.MapHttpRoute(
                "game-levels-level-get",
                "game/levels/level/{id}",
                new { controller = "Levels", action = "Get" },
                new { httpMethod = new HttpMethodConstraint("GET") }
            );

            config.EnableSystemDiagnosticsTracing();
        }
    }
}