using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class PhysCompDefinition
    {
        public int Id
        {
            get;
            set;
        }

        public int EntityTypeId
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
