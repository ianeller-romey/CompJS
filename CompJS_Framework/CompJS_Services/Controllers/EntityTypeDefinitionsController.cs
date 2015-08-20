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
    public class EntityTypeDefinitionsController : ApiController
    {
        ICompJS_Repo m_repo;

        public EntityTypeDefinitionsController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<EntityTypeDefinition> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllEntityTypeDefinitionsForGame(gameId).Select(x => TypeAdapter.Adapt<EntityTypeDefinition>(x)).ToList();
        }
    }
}