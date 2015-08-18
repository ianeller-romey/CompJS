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
    public class PhysCompsController : ApiController
    {
        ICompJS_Repo m_repo;

        public PhysCompsController()
        {
            m_repo = new Centipede_Repo();
        }

        public IEnumerable<PhysComp> Get()
        {
            return m_repo.RetrieveAllPhysComps().Select(x => TypeAdapter.Adapt<PhysComp>(x));
        }

        public PhysComp Get(int id)
        {
            return m_repo.RetrieveAllPhysComps().Select(x => TypeAdapter.Adapt<PhysComp>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}