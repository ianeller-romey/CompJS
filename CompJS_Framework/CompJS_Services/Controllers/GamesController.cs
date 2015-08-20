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
    public class GamesController : ApiController
    {
        ICompJS_Repo m_repo;

        public GamesController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<Game> Get()
        {
            return m_repo.RetrieveAllGames().Select(x => TypeAdapter.Adapt<Game>(x)).ToList();
        }

        public Game Get(int id)
        {
            return m_repo.RetrieveAllGames().Select(x => TypeAdapter.Adapt<Game>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}