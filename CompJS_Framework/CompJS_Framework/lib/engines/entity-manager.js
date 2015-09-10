
var EntityManager = function (gameId) {
    this.gameId = gameId;

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
            }, function (reason) {
                var reasonPlus = "Failed to load entity definitions";
                if (reason != null) {
                    reasonPlus = reasonPlus + "\r\n" + reason;
                }
                reject(reasonPlus);
            });
        });
    };

    this.shutdown = function (gameId) {
        return new Promise(function (resolve, reject) {
            entityTypeDefinitions = [];
            entityTypeNamedIds = [];
            entityInstances = [];
            resolve();
        });
    };

    var createEntityInstance = function (xEntityType, data, callback) {
        var entity = new Entity(entityIdGenerator++, xEntityType.entityTypeId, xEntityType.entityTypeName, xEntityType.position, xEntityType.rotation, xEntityType.scale, xEntityType.velocity);
        entityInstances.push(entity);
        var entityDefinition = entityTypeDefinitions[entity.typeId];

        if (entityHasBehavior(entityDefinition)) {
            messengerEngine.postImmediate("createBehavior", entity, entityDefinition.behavior);
            if (data != null) {
                messengerEngine.postImmediate("setBehaviorInstanceData", entity.instanceId, data);
            }
        }
        if (entityHasGraphics(entityDefinition)) {
            messengerEngine.postImmediate("createGraphics", entity, entityDefinition.graphics);
        }
        if (entityHasPhysics(entityDefinition)) {
            messengerEngine.postImmediate("createPhysics", entity, entityDefinition.physics);
        }

        if (callback != null) {
            callback(entity.instanceId);
        }
    };

    var createEntityInstanceFromMessage = function (name, additional, callback) {
        var entityTypeNamedId = entityTypeNamedIds[name];
        if (entityTypeNamedId != null) {
            var xEntityType = {
                entityTypeId: entityTypeNamedId,
                entityTypeName: name
            };
            if (additional != undefined) {
                if (additional.position !== undefined) {
                    xEntityType.position = {
                        x: additional.position.x,
                        y: additional.position.y
                    };
                }
                if (additional.rotation !== undefined) {
                    xEntityType.rotation = {
                        x: additional.rotation.x,
                        y: additional.rotation.y
                    };
                }
                if (additional.scale !== undefined) {
                    xEntityType.scale = {
                        x: additional.scale.x,
                        y: additional.scale.y
                    };
                }
                if (additional.velocity !== undefined) {
                    xEntityType.velocity = {
                        x: additional.velocity.x,
                        y: additional.velocity.y
                    };
                }
                createEntityInstance(xEntityType, additional.data, callback);
            } else {
                createEntityInstance(xEntityType, null, callback);
            }
        }
    };

    var removeEntityInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < entityInstances.length; ++i) {
            var instance = entityInstances[i];
            if (instance.instanceId === instanceId) {
                entityInstances.splice(i, 1);
                break;
            }
        }
    };

    var removeAllEntityInstancesButOne = function (instanceId) {
        while (entityInstances.length > 1) {
            var index = (entityInstances[0].instanceId === instanceId) ? 1 : 0;
            messengerEngine.postImmediate("removeEntityInstance", entityInstances[index].instanceId);
        }
    };

    var getTransformationForEntityInstance = function (instanceId) {
        var entityInstance = entityInstances.firstOrNull(function (x) {
            return x.instanceId == instanceId;
        });
        if (entityInstance != null) {
            messengerEngine.postImmediate("getTransformationForEntityInstanceResponse", instanceId, entityInstance.transformation);
        }
    };

    var setInstancePosition = function (instanceId, position) {
        var instance = entityInstances.firstOrNull(function (x) {
            return x.instanceId === instanceId;
        });
        if (instance != null) {
            var xPos = instance.transformation.position.x;
            var yPos = instance.transformation.position.y;
            if (position.x !== undefined) {
                xPos = position.x;
            }
            if (position.y !== undefined) {
                yPos = position.y;
            }
            instance.transformation.setPosition(xPos, yPos);
        }
    };

    var setInstanceScale = function (instanceId, scale) {
        var instance = entityInstances.firstOrNull(function (x) {
            return x.instanceId === instanceId;
        });
        if (instance != null) {
            var xPos = instance.transformation.scale.x;
            var yPos = instance.transformation.scale.y;
            if (scale.x !== undefined) {
                xPos = scale.x;
            }
            if (scale.y !== undefined) {
                yPos = scale.y;
            }
            instance.transformation.setScale(xPos, yPos);
        }
    };

    this.getGameId = function () {
        messengerEngine.postImmediate("getGameIdResponse", this.gameId);
    }

    this.loadLevel = function (gameId, levelId) {
        servicesEngine.loadLevel(gameId, levelId).then(function (data) {
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
        }, function (reason) {
            var reasonPlus = "Failed to load game level";
            if (reason != null) {
                reasonPlus = reasonPlus + "\r\n" + reason;
            }
            reject(reasonPlus);
        });
    };

    messengerEngine.register("createEntityInstance", this, createEntityInstanceFromMessage);
    messengerEngine.register("removeEntityInstance", this, removeEntityInstanceFromMessage);
    messengerEngine.register("removeAllEntityInstancesButOne", this, removeAllEntityInstancesButOne);
    messengerEngine.register("setInstancePosition", this, setInstancePosition);
    messengerEngine.register("setInstanceScale", this, setInstanceScale);
    messengerEngine.register("getTransformationForEntityInstanceRequest", this, getTransformationForEntityInstance);
    messengerEngine.register("getGameIdRequest", this, this.getGameId);

};