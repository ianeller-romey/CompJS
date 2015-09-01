using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class GfxCompDefinitionCollection
    {
        public IEnumerable<GfxCompDefinition_2DAnimation> Gfx2DAnimations
        {
            get;
            set;
        }

        public IEnumerable<GfxCompDefinition_Font> GfxFonts
        {
            get;
            set;
        }
    }
}
