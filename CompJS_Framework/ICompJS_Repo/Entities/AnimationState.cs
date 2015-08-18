using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class AnimationState
    {
        public int Id
        {
            get;
            set;
        }

        public int GfxCompId
        {
            get;
            set;
        }

        public int State
        {
            get;
            set;
        }

        public IEnumerable<AnimationFrame> AnimationFrames
        {
            get;
            set;
        }
    }
}
