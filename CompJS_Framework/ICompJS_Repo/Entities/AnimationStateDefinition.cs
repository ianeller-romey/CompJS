using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class AnimationStateDefinition
    {
        public int Id
        {
            get;
            set;
        }

        public int GfxCompDefinitionId
        {
            get;
            set;
        }

        public int State
        {
            get;
            set;
        }

        public IEnumerable<AnimationFrameDefinition> AnimationFrameDefinitions
        {
            get;
            set;
        }
    }
}
