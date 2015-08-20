
var EntityManager = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var entityTypeDefinitions = [];
    var entityTypeNamedIds = [];
    var entityInstances = [];

    var entityHasBehavior = Entity.hasBehavior;
    var entityHasGraphics = Entity.hasGraphics;
    var entityHasPhysics = Entity.hasPhysics;

    var entityIdGenerator = 0;

    var buildEntityTypeDefinitions = function (data) {
        data.forEach(function (x) {
            entityTypeDefinitions[x.id] = {
                name: x.name,
                behavior: x.behavior,
                graphics: x.graphics,
                physics: x.physics
            };

            entityTypeNamedIds[x.name] = x.id;
        });
    };

    this.init = function (gameId) {
        return new Promise(function (resolve, reject) {
            servicesEngine.retrieveAllEntityTypeDefinitionsForGame(gameId).then(function (data) {
                buildEntityTypeDefinitions(data);
                resolve();
            });
        });
    };

    var createEntityInstance = function (xEntityType) {
        var entity = new Entity(entityIdGenerator++, xEntityType.entityTypeId, xEntityType.entityTypeName, {
            x: xEntityType.x,
            y: xEntityType.y
        });
        entityInstances.push(entity);
        var entityDefinition = entityTypeDefinitions[entity.typeId];

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
        var entityTypeNamedId = entityTypeNamedIds[name];
        if (entityTypeNamedId != null) {
            var xEntityType = {
                entityTypeId: entityTypeNamedId,
                entityTypeName: name,
                x: position.x,
                y: position.y
            };
            createEntityInstance(xEntityType);
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

            data.entityTypesOnAllLevels.forEach(function (x) {
                createEntityInstance({
                    entityTypeId: x.id,
                    entityTypeName: x.name,
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