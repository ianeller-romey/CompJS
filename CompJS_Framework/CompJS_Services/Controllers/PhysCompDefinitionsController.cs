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
    public class PhysCompDefinitionsController : ApiController
    {
        ICompJS_Repo m_repo;

        public PhysCompDefinitionsController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<PhysCompDefinition> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllPhysCompDefinitionsForGame(gameId).Select(x => TypeAdapter.Adapt<PhysCompDefinition>(x)).ToList();
        }
    }
}