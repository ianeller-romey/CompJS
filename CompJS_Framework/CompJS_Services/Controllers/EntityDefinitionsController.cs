using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using FastMapper;

using CompJS_Repo.Interface;
using CompJS_Repo.Centipede;

using CompJS_Services.Models;


namespace CompJS_Services.Controllers
{
    public class EntityDefinitionsController : ApiController
    {
        ICompJS_Repo m_repo;

        public EntityDefinitionsController()
        {
            m_repo = new Centipede_Repo();
        }

        public IEnumerable<EntityDefinition> Get()
        {
            return m_repo.RetrieveAllEntityDefinitions().Select(x => TypeAdapter.Adapt<EntityDefinition>(x));
        }

        public EntityDefinition Get(int id)
        {
            return m_repo.RetrieveAllEntityDefinitions().Select(x => TypeAdapter.Adapt<EntityDefinition>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}