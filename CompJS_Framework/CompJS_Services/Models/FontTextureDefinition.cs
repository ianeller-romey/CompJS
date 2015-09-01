using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class FontTextureDefinition
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

        public string Texture
        {
            get;
            set;
        }

        public double StartT
        {
            get;
            set;
        }

        public double StartL
        {
            get;
            set;
        }

        public double CharacterWidth
        {
            get;
            set;
        }

        public double CharacterHeight
        {
            get;
            set;
        }
    }
}
