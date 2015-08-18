using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class EntityDefinition
    {
        public int Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

        public int? Behavior
        {
            get;
            set;
        }

        public int? Graphics
        {
            get;
            set;
        }

        public int? Physics
        {
            get;
            set;
        }
    }
}
