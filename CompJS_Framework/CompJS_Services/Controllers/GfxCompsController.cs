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
    public class GfxCompsController : ApiController
    {
        ICompJS_Repo m_repo;

        public GfxCompsController()
        {
            m_repo = new Centipede_Repo();
        }

        public IEnumerable<GfxComp> Get()
        {
            return m_repo.RetrieveAllGfxComps().Select(x => TypeAdapter.Adapt<GfxComp>(x));
        }

        public GfxComp Get(int id)
        {
            return m_repo.RetrieveAllGfxComps().Select(x => TypeAdapter.Adapt<GfxComp>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}