using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class BhvCompDefinition
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

        public string StateFile
        {
            get;
            set;
        }

        public string BehaviorConstructor
        {
            get;
            set;
        }
    }
}
