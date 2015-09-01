using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using FastMapper;

using CompJS_Repo.Interface;
using CompJS_Repo;

using CompJS_Services.Models;


namespace CompJS_Services.Controllers
{
    public class GfxCompDefinitionsController : ApiController
    {
        ICompJS_Repo m_repo;

        public GfxCompDefinitionsController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public GfxCompDefinitionCollection GetForGame(int gameId)
        {
            return TypeAdapter.Adapt<GfxCompDefinitionCollection>(m_repo.RetrieveAllGfxCompDefinitionsForGame(gameId));
        }
    }
}