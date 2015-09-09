using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

using FastMapper;

using CompJS_Repo.Interface;
using CompJS_Repo;

using CompJS_Services.Models;


namespace CompJS_Services.Controllers
{
    public class HighScoresController : ApiController
    {
        ICompJS_Repo m_repo;

        public HighScoresController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<HighScore> Get(int gameId, int count)
        {
            return m_repo.RetrieveTopHighScoresForGame(count, gameId).Select(x => TypeAdapter.Adapt<HighScore>(x)).ToList();
        }

        public IEnumerable<HighScore> Post(int gameId, string playerName, long score, int count)
        {
            return m_repo.CreateHighScoreForGame(playerName, score, count, gameId).Select(x => TypeAdapter.Adapt<HighScore>(x)).ToList();
        }
    }
}