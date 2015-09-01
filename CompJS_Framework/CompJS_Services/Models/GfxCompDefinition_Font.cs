using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class GfxCompDefinition_Font
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

        public int RenderPass
        {
            get;
            set;
        }

        public FontTextureDefinition FontTextureDefinition
        {
            get;
            set;
        }
    }
}
