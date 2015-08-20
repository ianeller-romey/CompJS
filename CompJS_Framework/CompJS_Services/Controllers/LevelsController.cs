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
    public class LevelsController : ApiController
    {
        ICompJS_Repo m_repo;

        public LevelsController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public LevelStartData Get(int id)
        {
            return TypeAdapter.Adapt<LevelStartData>(m_repo.RetrieveLevel(id));
        }

        public IEnumerable<Level> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllLevelsForGame(gameId).Select(x => TypeAdapter.Adapt<Level>(x)).ToList();
        }
    }
}