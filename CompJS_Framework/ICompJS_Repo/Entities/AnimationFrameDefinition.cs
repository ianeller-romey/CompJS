using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Repo.Entities
{
    public class AnimationFrameDefinition
    {
        public int Id
        {
            get;
            set;
        }

        public int AnimationStateDefinitionId
        {
            get;
            set;
        }

        public int Frame
        {
            get;
            set;
        }

        public double? Duration
        {
            get;
            set;
        }

        public string Texture
        {
            get;
            set;
        }

        public double Width
        {
            get;
            set;
        }

        public double Height
        {
            get;
            set;
        }

        public double TexCoordTL
        {
            get;
            set;
        }

        public double TexCoordTR
        {
            get;
            set;
        }

        public double TexCoordBR
        {
            get;
            set;
        }

        public double TexCoordBL
        {
            get;
            set;
        }
    }
}
