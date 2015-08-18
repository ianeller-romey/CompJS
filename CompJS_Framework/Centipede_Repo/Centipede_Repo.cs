using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

using FastMapper;

using CompJS_Repo.Entities;
using CompJS_Repo.Interface;

using CompJS_Repo.Centipede.Repository;


namespace CompJS_Repo.Centipede
{
    public class Centipede_Repo : ICompJS_Repo
    {
        public Centipede_Repo()
        {
        }

        public IEnumerable<AudioType> RetrieveAudioTypes()
        {
            IEnumerable<AudioType> audioTypes;
            using (var db = new CentipedeDbEntities())
            {
                var results = db.RetrieveAudioTypes();
                audioTypes = results.Select(x => TypeAdapter.Adapt<AudioType>(x)).ToList();
            }
            return audioTypes;
        }

        public IEnumerable<PhysType> RetrievePhysTypes()
        {
            IEnumerable<PhysType> physTypes;
            using (var db = new CentipedeDbEntities())
            {
                var results = db.RetrievePhysTypes();
                physTypes = results.Select(x => TypeAdapter.Adapt<PhysType>(x)).ToList();
            }
            return physTypes;
        }

        public IEnumerable<CollisionType> RetrieveCollisionTypes()
        {
            IEnumerable<CollisionType> collisionTypes;
            using (var db = new CentipedeDbEntities())
            {
                var results = db.RetrieveCollisionTypes();
                collisionTypes = results.Select(x => TypeAdapter.Adapt<CollisionType>(x)).ToList();
            }
            return collisionTypes;
        }

        public IEnumerable<Audio> RetrieveAllAudio()
        {
            IEnumerable<Audio> audio;
            using (var db = new CentipedeDbEntities())
            {
                var results = db.RetrieveAllAudio();
                audio = results.Select(x => TypeAdapter.Adapt<Audio>(x)).ToList();
            }
            return audio;
        }

        public IEnumerable<BhvComp> RetrieveAllBhvComps()
        {
            IEnumerable<BhvComp> bhvComponents;
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveAllBhvComps();
                bhvComponents = result.Select(x => TypeAdapter.Adapt<BhvComp>(x)).ToList();
            }
            return bhvComponents;
        }

        public IEnumerable<GfxComp> RetrieveAllGfxComps()
        {
            IEnumerable<GfxComp> gfxComponents;
            IEnumerable<AnimationState> animationStates;
            IEnumerable<AnimationFrame> animationFrames;
            using (var db = new CentipedeDbEntities())
            {
                var gResults = db.RetrieveAllGfxComps();
                gfxComponents = gResults.Select(x => TypeAdapter.Adapt<GfxComp>(x)).ToList();

                var asResults = gResults.GetNextResult<RetrieveAnimationStatesForGfxComp_Result>();
                animationStates = asResults.Select(x => TypeAdapter.Adapt<AnimationState>(x)).ToList();

                var afResults = asResults.GetNextResult<RetrieveAnimationFramesForAnimationState_Result>();
                animationFrames = afResults.Select(x => TypeAdapter.Adapt<AnimationFrame>(x)).ToList();
            }
            foreach (var a in animationStates)
            {
                a.AnimationFrames = animationFrames.Where(x => x.AnimationStateId == a.Id).ToList();
            }
            foreach (var g in gfxComponents)
            {
                g.AnimationStates = animationStates.Where(x => x.GfxCompId == g.Id).ToList();
            }
            return gfxComponents;
        }

        public IEnumerable<PhysComp> RetrieveAllPhysComps()
        {
            IEnumerable<PhysComp> physComponents;
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveAllPhysComps();
                physComponents = result.Select(x => TypeAdapter.Adapt<PhysComp>(x)).ToList();
            }
            return physComponents;
        }

        public IEnumerable<EntityDefinition> RetrieveAllEntityDefinitions()
        {
            IEnumerable<EntityDefinition> entityDefinitions;
            using (var db = new CentipedeDbEntities())
            {
                var eResults = db.RetrieveAllEntityDefinitions();
                entityDefinitions = eResults.Select(x => TypeAdapter.Adapt<EntityDefinition>(x)).ToList();
            }
            return entityDefinitions;
        }

        public LevelStartData RetrieveLevel(int levelId)
        {
            IEnumerable<LevelPosition> levelPositions;
            IEnumerable<Entity> entities;
            using (var db = new CentipedeDbEntities())
            {
                var lResults = db.RetrieveLevelLayoutsForLevel(levelId);
                levelPositions = lResults.Select(x => TypeAdapter.Adapt<LevelPosition>(x)).ToList();

                var eResults = lResults.GetNextResult<RetrieveEntity_Result>();
                entities = eResults.Select(x => TypeAdapter.Adapt<Entity>(x)).ToList();
            }

            return
                new LevelStartData()
                {
                    LevelPositions = levelPositions,
                    EntitiesOnAllLevels = entities
                };
        }

        public BhvComp RetrieveBhvComp(int id)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveBhvComp(id).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<BhvComp>(result) : null;
            }
        }

        public GfxComp RetrieveGfxComp(int id)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveGfxComp(id).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<GfxComp>(result) : null;
            }
        }

        public PhysComp RetrievePhysComp(int id)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrievePhysComp(id).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<PhysComp>(result) : null;
            }
        }

        public BhvComp RetrieveBhvCompForEntity(int entityId)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveBhvCompForEntity(entityId).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<BhvComp>(result) : null;
            }
        }

        public GfxComp RetrieveGfxCompForEntity(int entityId)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrieveGfxCompForEntity(entityId).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<GfxComp>(result) : null;
            }
        }

        public PhysComp RetrievePhysCompForEntity(int entityId)
        {
            using (var db = new CentipedeDbEntities())
            {
                var result = db.RetrievePhysCompForEntity(entityId).FirstOrDefault();
                return (result != null) ? TypeAdapter.Adapt<PhysComp>(result) : null;
            }
        }

    }
}
