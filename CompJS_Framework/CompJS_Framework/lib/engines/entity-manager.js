
var EntityManager = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var entityDefinitions = [];
    var entityNamedIds = [];
    var entityInstances = [];

    var entityHasBehavior = Entity.hasBehavior;
    var entityHasGraphics = Entity.hasGraphics;
    var entityHasPhysics = Entity.hasPhysics;

    var entityIdGenerator = 0;

    var buildEntityDefinitions = function (data) {
        data.forEach(function (x) {
            entityDefinitions[x.id] = {
                name: x.name,
                behavior: x.behavior,
                graphics: x.graphics,
                physics: x.physics
            };

            entityNamedIds[x.name] = x.id;
        });
    };

    this.init = function () {
        return new Promise(function (resolve, reject) {
            servicesEngine.retrieveAllEntityDefinitions().then(function (data) {
                buildEntityDefinitions(data);
                resolve();
            });
        });
    };

    var createEntityInstance = function (xEntity) {
        var entity = new Entity(entityIdGenerator++, xEntity.entityId, xEntity.entityName, {
            x: xEntity.x,
            y: xEntity.y
        });
        entityInstances.push(entity);
        var entityDefinition = entityDefinitions[entity.entityId];

        if (entityHasBehavior(entityDefinition)) {
            messengerEngine.queueForPosting("createBehavior", entity, entityDefinition.behavior);
        }
        if (entityHasGraphics(entityDefinition)) {
            messengerEngine.queueForPosting("createGraphics", entity, entityDefinition.graphics);
        }
        if (entityHasPhysics(entityDefinition)) {
            messengerEngine.queueForPosting("createPhysics", entity, entityDefinition.physics);
        }
    };

    var createEntityInstanceFromMessage = function (name, position) {
        var entityNamedId = entityNamedIds[name];
        if (entityNamedId != null) {
            var xEntity = {
                entityId: entityNamedId,
                entityName: name,
                x: position.x,
                y: position.y
            };
            createEntityInstance(xEntity);
        }
    };

    var removeEntityInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < entityInstances.length; ++i) {
            var instance = entityInstances[i];
            if (instance.instanceId == instanceId) {
                entityInstances.splice(i, 1);
                break;
            }
        }
    };

    this.loadLevel = function (levelId) {
        servicesEngine.loadLevel(levelId).then(function (data) {
            entityInstances = [];

            data.levelPositions.forEach(function (x) {
                createEntityInstance(x);
            });

            data.entitiesOnAllLevels.forEach(function (x) {
                createEntityInstance({
                    entityId: x.id,
                    entityName: x.name,
                    behavior: x.behavior,
                    graphics: x.graphics,
                    physics: x.physics,
                    x: 0,
                    y: 0
                });
            });
        });

    };

    messengerEngine.register("createEntityInstance", this, createEntityInstanceFromMessage);
    messengerEngine.register("removeEntityInstance", this, removeEntityInstanceFromMessage);

};