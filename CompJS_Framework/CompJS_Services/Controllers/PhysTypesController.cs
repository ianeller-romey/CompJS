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
    public class PhysTypesController : ApiController
    {
        ICompJS_Repo m_repo;

        public PhysTypesController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<PhysType> Get()
        {
            return m_repo.RetrievePhysTypes().Select(x => TypeAdapter.Adapt<PhysType>(x));
        }

        public PhysType Get(int id)
        {
            return m_repo.RetrievePhysTypes().Select(x => TypeAdapter.Adapt<PhysType>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}