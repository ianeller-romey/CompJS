using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;


namespace CompJS_Repo.Entities
{
    public class LevelStartData
    {
        public IEnumerable<LevelPosition> LevelPositions
        {
            get;
            set;
        }

        public IEnumerable<EntityType> EntityTypesOnAllLevels
        {
            get;
            set;
        }
    }
}
