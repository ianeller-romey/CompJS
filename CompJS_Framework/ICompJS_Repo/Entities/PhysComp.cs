using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class PhysComp
    {
        public int Id
        {
            get;
            set;
        }

        public int EntityId
        {
            get;
            set;
        }

        public int PhysTypeId
        {
            get;
            set;
        }

        public int CollisionTypeId
        {
            get;
            set;
        }

        public string BoundingData
        {
            get;
            set;
        }
    }
}
