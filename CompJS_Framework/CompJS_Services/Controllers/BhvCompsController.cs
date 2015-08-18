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
    public class BhvCompsController : ApiController
    {
        ICompJS_Repo m_repo;

        public BhvCompsController()
        {
            m_repo = new Centipede_Repo();
        }

        public IEnumerable<BhvComp> Get()
        {
            return m_repo.RetrieveAllBhvComps().Select(x => TypeAdapter.Adapt<BhvComp>(x));
        }

        public BhvComp Get(int id)
        {
            return m_repo.RetrieveAllBhvComps().Select(x => TypeAdapter.Adapt<BhvComp>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}