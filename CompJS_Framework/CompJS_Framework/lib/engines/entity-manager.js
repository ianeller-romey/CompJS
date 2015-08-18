
var EntityManager = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var entityDefinitions = [];
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

    this.loadLevel = function (levelId) {
        servicesEngine.loadLevel(levelId).then(function (data) {
            entityInstances = [];

            data.levelPositions.forEach(function (x) {
                var entity = new Entity(entityIdGenerator++, x.entityId, x.entityName, {
                    x: x.x,
                    y: x.y
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
            });
        });

    };

};