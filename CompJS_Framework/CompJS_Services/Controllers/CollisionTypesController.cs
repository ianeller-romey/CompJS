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
    public class CollisionTypesController : ApiController
    {
        ICompJS_Repo m_repo;

        public CollisionTypesController()
        {
            m_repo = new Centipede_Repo();
        }

        public IEnumerable<CollisionType> Get()
        {
            return m_repo.RetrieveCollisionTypes().Select(x => TypeAdapter.Adapt<CollisionType>(x));
        }

        public CollisionType Get(int id)
        {
            return m_repo.RetrieveCollisionTypes().Select(x => TypeAdapter.Adapt<CollisionType>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}