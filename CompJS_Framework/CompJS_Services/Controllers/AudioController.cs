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
    public class AudioController : ApiController
    {
        ICompJS_Repo m_repo;

        public AudioController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<Audio> GetForGame(int gameId)
        {
            return m_repo.RetrieveAllAudioForGame(gameId).Select(x => TypeAdapter.Adapt<Audio>(x)).ToList();
        }
    }
}