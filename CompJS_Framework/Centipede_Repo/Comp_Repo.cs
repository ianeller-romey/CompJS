using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

using FastMapper;

using CompJS_Repo.Entities;
using CompJS_Repo.Interface;

using CompJS_Repo.Repository;


namespace CompJS_Repo
{
    public class CompJS_Repo : ICompJS_Repo
    {
        public CompJS_Repo()
        {
        }

        public IEnumerable<AudioType> RetrieveAudioTypes()
        {
            IEnumerable<AudioType> audioTypes;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveAudioTypes();
                audioTypes = results.Select(x => TypeAdapter.Adapt<AudioType>(x)).ToList();
            }
            return audioTypes;
        }

        public IEnumerable<PhysType> RetrievePhysTypes()
        {
            IEnumerable<PhysType> physTypes;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrievePhysTypes();
                physTypes = results.Select(x => TypeAdapter.Adapt<PhysType>(x)).ToList();
            }
            return physTypes;
        }

        public IEnumerable<CollisionType> RetrieveCollisionTypes()
        {
            IEnumerable<CollisionType> collisionTypes;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveCollisionTypes();
                collisionTypes = results.Select(x => TypeAdapter.Adapt<CollisionType>(x)).ToList();
            }
            return collisionTypes;
        }

        public IEnumerable<Game> RetrieveAllGames()
        {
            IEnumerable<Game> games;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveAllGames();
                games = results.Select(x => TypeAdapter.Adapt<Game>(x)).ToList();
            }
            return games;
        }

        public IEnumerable<Audio> RetrieveAllAudioForGame(int gameId)
        {
            IEnumerable<Audio> audio;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveAllAudioForGame(gameId);
                audio = results.Select(x => TypeAdapter.Adapt<Audio>(x)).ToList();
            }
            return audio;
        }

        public IEnumerable<BhvCompDefinition> RetrieveAllBhvCompDefinitionsForGame(int gameId)
        {
            IEnumerable<BhvCompDefinition> bhvComponents;
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveAllBhvCompDefinitionsForGame(gameId);
                bhvComponents = result.Select(x => TypeAdapter.Adapt<BhvCompDefinition>(x)).ToList();
            }
            return bhvComponents;
        }

        public GfxCompDefinitionCollection RetrieveAllGfxCompDefinitionsForGame(int gameId)
        {
            IEnumerable<GfxCompDefinition> gfxComponents;
            IEnumerable<AnimationStateDefinition> animationStates;
            IEnumerable<AnimationFrameDefinition> animationFrames;
            IEnumerable<FontTextureDefinition> fonts;

            var gfxCompDefinitionCollection = new GfxCompDefinitionCollection();
            using (var db = new CompJSdbEntities())
            {
                var gResults = db.RetrieveAllGfxCompDefinitionsForGame(gameId);
                gfxComponents = gResults.Select(x => TypeAdapter.Adapt<GfxCompDefinition>(x)).ToList();

                var asResults = gResults.GetNextResult<RetrieveAnimationStateDefinitionsForGfxCompDefinition_Result>();
                animationStates = asResults.Select(x => TypeAdapter.Adapt<AnimationStateDefinition>(x)).ToList();

                var afResults = asResults.GetNextResult<RetrieveAnimationFrameDefinitionsForAnimationStateDefinition_Result>();
                animationFrames = afResults.Select(x => TypeAdapter.Adapt<AnimationFrameDefinition>(x)).ToList();

                var fResults = afResults.GetNextResult<RetrieveFontTextureDefinitionsForGfxComp_Result>();
                fonts = fResults.Select(x => TypeAdapter.Adapt<FontTextureDefinition>(x)).ToList();
            }

            foreach (var a in animationStates)
            {
                a.AnimationFrameDefinitions = animationFrames.Where(x => x.AnimationStateDefinitionId == a.Id).ToList();
            }
            gfxCompDefinitionCollection.Gfx2DAnimations = (from a in animationStates.Select(x => x.GfxCompDefinitionId).Distinct()
                                                          join g in gfxComponents
                                                          on a equals g.Id
                                                          select new GfxCompDefinition_2DAnimation()
                                                          {
                                                              Id = g.Id,
                                                              EntityTypeId = g.EntityTypeId,
                                                              RenderPass = g.RenderPass,
                                                              AnimationStateDefinitions = (from aa in animationStates
                                                                                           where aa.GfxCompDefinitionId == g.Id
                                                                                           select aa).ToList()
                                                          }).ToList();
            gfxCompDefinitionCollection.GfxFonts = (from f in fonts.Select(x => x.GfxCompDefinitionId).Distinct()
                                                    join g in gfxComponents
                                                    on f equals g.Id
                                                    select new GfxCompDefinition_Font()
                                                    {
                                                        Id = g.Id,
                                                        EntityTypeId = g.EntityTypeId,
                                                        RenderPass = g.RenderPass,
                                                        FontTextureDefinition = (from ff in fonts
                                                                                where ff.GfxCompDefinitionId == g.Id
                                                                                select ff).FirstOrDefault()
                                                    }).ToList();
            return gfxCompDefinitionCollection;
        }

        public IEnumerable<PhysCompDefinition> RetrieveAllPhysCompDefinitionsForGame(int gameId)
        {
            IEnumerable<PhysCompDefinition> physComponents;
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveAllPhysCompDefinitionsForGame(gameId);
                physComponents = result.Select(x => TypeAdapter.Adapt<PhysCompDefinition>(x)).ToList();
            }
            return physComponents;
        }

        public IEnumerable<EntityTypeDefinition> RetrieveAllEntityTypeDefinitionsForGame(int gameId)
        {
            IEnumerable<EntityTypeDefinition> entityDefinitions;
            using (var db = new CompJSdbEntities())
            {
                var eResults = db.RetrieveAllEntityTypeDefinitionsForGame(gameId);
                entityDefinitions = eResults.Select(x => TypeAdapter.Adapt<EntityTypeDefinition>(x)).ToList();
            }
            return entityDefinitions;
        }

        public IEnumerable<Shader> RetrieveAllShadersForGame(int gameId)
        {
            IEnumerable<Shader> shaders;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveAllShadersForGame(gameId);
                shaders = results.Select(x => TypeAdapter.Adapt<Shader>(x)).ToList();
            }
            return shaders;
        }

        public IEnumerable<Level> RetrieveAllLevelsForGame(int gameId)
        {
            IEnumerable<Level> levels;
            using (var db = new CompJSdbEntities())
            {
                var results = db.RetrieveAllLevelsForGame(gameId);
                levels = results.Select(x => TypeAdapter.Adapt<Level>(x)).ToList();
            }
            return levels;
        }

        public LevelStartData RetrieveLevel(int levelId)
        {
            IEnumerable<LevelPosition> levelPositions;
            IEnumerable<EntityType> entities;
            using (var db = new CompJSdbEntities())
            {
                var lResults = db.RetrieveLevelLayoutsForLevel(levelId);
                levelPositions = lResults.Select(x => TypeAdapter.Adapt<LevelPosition>(x)).ToList();

                var eResults = lResults.GetNextResult<RetrieveEntity_Result>();
                entities = eResults.Select(x => TypeAdapter.Adapt<EntityType>(x)).ToList();
            }

            return
                new LevelStartData()
                {
                    LevelPositions = levelPositions,
                    EntityTypesOnAllLevels = entities
                };
        }

        public BhvCompDefinition RetrieveBhvComp(int id)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveBhvCompDefinition(id);
                return (result != null) ? TypeAdapter.Adapt<BhvCompDefinition>(result) : null;
            }
        }

        public GfxCompDefinition_2DAnimation RetrieveGfxComp(int id)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveGfxCompDefinition(id);
                return (result != null) ? TypeAdapter.Adapt<GfxCompDefinition_2DAnimation>(result) : null;
            }
        }

        public PhysCompDefinition RetrievePhysComp(int id)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrievePhysCompDefinition(id);
                return (result != null) ? TypeAdapter.Adapt<PhysCompDefinition>(result) : null;
            }
        }

        public BhvCompDefinition RetrieveBhvCompForEntity(int entityId)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveBhvCompDefinitionForEntity(entityId);
                return (result != null) ? TypeAdapter.Adapt<BhvCompDefinition>(result) : null;
            }
        }

        public GfxCompDefinition_2DAnimation RetrieveGfxCompForEntity(int entityId)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrieveGfxCompDefinitionForEntity(entityId);
                return (result != null) ? TypeAdapter.Adapt<GfxCompDefinition_2DAnimation>(result) : null;
            }
        }

        public PhysCompDefinition RetrievePhysCompForEntity(int entityId)
        {
            using (var db = new CompJSdbEntities())
            {
                var result = db.RetrievePhysCompDefinitionForEntity(entityId);
                return (result != null) ? TypeAdapter.Adapt<PhysCompDefinition>(result) : null;
            }
        }

    }
}
