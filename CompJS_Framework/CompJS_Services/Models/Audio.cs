using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class Audio
    {
        public int Id
        {
            get;
            set;
        }

        public int AudioTypeId
        {
            get;
            set;
        }

        public string AudioFile
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }
    }
}
