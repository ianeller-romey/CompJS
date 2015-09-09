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
        IEnumerable<Game> RetrieveAllGames();
        IEnumerable<Audio> RetrieveAllAudioForGame(int gameId);
        IEnumerable<BhvCompDefinition> RetrieveAllBhvCompDefinitionsForGame(int gameId);
        GfxCompDefinitionCollection RetrieveAllGfxCompDefinitionsForGame(int gameId);
        IEnumerable<PhysCompDefinition> RetrieveAllPhysCompDefinitionsForGame(int gameId);
        IEnumerable<EntityTypeDefinition> RetrieveAllEntityTypeDefinitionsForGame(int gameId);
        IEnumerable<Shader> RetrieveAllShadersForGame(int gameId);
        IEnumerable<Level> RetrieveAllLevelsForGame(int gameId);
        LevelStartData RetrieveLevel(int levelId);

        BhvCompDefinition RetrieveBhvComp(int id);
        GfxCompDefinition_2DAnimation RetrieveGfxComp(int id);
        PhysCompDefinition RetrievePhysComp(int id);
        BhvCompDefinition RetrieveBhvCompForEntity(int entityId);
        GfxCompDefinition_2DAnimation RetrieveGfxCompForEntity(int entityId);
        PhysCompDefinition RetrievePhysCompForEntity(int entityId);

        IEnumerable<HighScore> RetrieveTopHighScoresForGame(int count, int gameId);
        IEnumerable<HighScore> CreateHighScoreForGame(string playerName, long score, int count, int gameId);
    }
}
