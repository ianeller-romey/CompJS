﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class AnimationFrame
    {
        public int Id
        {
            get;
            set;
        }

        public int AnimationStateId
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
