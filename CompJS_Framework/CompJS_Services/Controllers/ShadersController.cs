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
    public class ShadersController : ApiController
    {
        ICompJS_Repo m_repo;

        public ShadersController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<Shader> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllShadersForGame(gameId).Select(x => TypeAdapter.Adapt<Shader>(x)).ToList();
        }
    }
}