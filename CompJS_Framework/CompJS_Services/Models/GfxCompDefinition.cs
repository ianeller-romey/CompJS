using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class GfxCompDefinition
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

        public IEnumerable<AnimationStateDefinition> AnimationStateDefinitions
        {
            get;
            set;
        }
    }
}
