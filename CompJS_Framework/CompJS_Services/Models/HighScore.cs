using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompJS_Services.Models
{
    public class HighScore
    {
        public int Id
        {
            get;
            set;
        }

        public string PlayerName
        {
            get;
            set;
        }

        public long Score
        {
            get;
            set;
        }

        public int GameId
        {
            get;
            set;
        }
    }
}
