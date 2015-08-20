﻿using System;
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
    public class AudioTypesController : ApiController
    {
        ICompJS_Repo m_repo;

        public AudioTypesController()
        {
            m_repo = new CompJS_Repo.CompJS_Repo();
        }

        public IEnumerable<AudioType> Get()
        {
            return m_repo.RetrieveAudioTypes().Select(x => TypeAdapter.Adapt<AudioType>(x));
        }

        public AudioType Get(int id)
        {
            return m_repo.RetrieveAudioTypes().Select(x => TypeAdapter.Adapt<AudioType>(x)).FirstOrDefault(x => x.Id == id);
        }
    }
}