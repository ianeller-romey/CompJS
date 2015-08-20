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
    public class BhvCompDefinitionsController : ApiController
    {
        ICompJS_Repo m_repo;

        public BhvCompDefinitionsController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<BhvCompDefinition> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllBhvCompDefinitionsForGame(gameId).Select(x => TypeAdapter.Adapt<BhvCompDefinition>(x)).ToList();
        }
    }
}