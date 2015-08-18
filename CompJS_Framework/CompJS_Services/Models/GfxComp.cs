using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class GfxComp
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

        public IEnumerable<AnimationState> AnimationStates
        {
            get;
            set;
        }
    }
}
