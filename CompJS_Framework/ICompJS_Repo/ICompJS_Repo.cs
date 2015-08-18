using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using CompJS_Repo.Entities;


namespace CompJS_Repo.Interface
{
    public interface ICompJS_Repo
    {
        IEnumerable<AudioType> RetrieveAudioTypes();
        IEnumerable<PhysType> RetrievePhysTypes();
        IEnumerable<CollisionType> RetrieveCollisionTypes();
        IEnumerable<Audio> RetrieveAllAudio();
        IEnumerable<BhvComp> RetrieveAllBhvComps();
        IEnumerable<GfxComp> RetrieveAllGfxComps();
        IEnumerable<PhysComp> RetrieveAllPhysComps();
        IEnumerable<EntityDefinition> RetrieveAllEntityDefinitions();
        LevelStartData RetrieveLevel(int levelId);

        BhvComp RetrieveBhvComp(int id);
        GfxComp RetrieveGfxComp(int id);
        PhysComp RetrievePhysComp(int id);
        BhvComp RetrieveBhvCompForEntity(int entityId);
        GfxComp RetrieveGfxCompForEntity(int entityId);
        PhysComp RetrievePhysCompForEntity(int entityId);
    }
}
