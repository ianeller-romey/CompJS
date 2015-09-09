
var PhysEngine = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var physTypeDefinitions = [];
    var collisionTypeDefinitions = [];
    var physCompDefinitions = [];
    var physCompInstances = [];

    var buildPhysTypeDefinitions = function (data) {
        data.forEach(function (x) {
            physTypeDefinitions[x.id] = x.name;
        });
    };

    var buildCollisionTypeDefinitions = function (data) {
        data.forEach(function (x) {
            collisionTypeDefinitions[x.id] = x.name;
        });
    };

    var buildPhysCompDefinitions = function (data) {
        data.forEach(function (x) {
            var physType = physTypeDefinitions[x.physTypeId];
            var boundingData;
            if (physType == "Circle") {
                boundingData = new BoundingCircle(JSON.parse(x.boundingData));
            } else if (physType == "AABB") {
                boundingData = new BoundingAABB(JSON.parse(x.boundingData));
            }
            physCompDefinitions[x.id] = {
                physTypeId: x.physTypeId,
                collisionTypeId: x.collisionTypeId,
                boundingData: boundingData
            };
        });
    };

    this.init = function (gameId) {
        var physTypesPromise = new Promise(function (resolve, reject) {
            servicesEngine.retrievePhysTypes().then(function (data) {
                buildPhysTypeDefinitions(data);
                resolve();
            });
        });
        var collisionTypesPromise = new Promise(function (resolve, reject) {
            servicesEngine.retrieveCollisionTypes().then(function (data) {
                buildCollisionTypeDefinitions(data);
                resolve();
            });
        });

        return new Promise(function (resolve, reject) {
            Promise.all([physTypesPromise, collisionTypesPromise]).then(function () {
                servicesEngine.retrieveAllPhysCompDefinitionsForGame(gameId).then(function (data) {
                    buildPhysCompDefinitions(data);
                    resolve();
                });
            });
        });
    };

    var addColliders = function (instance, otherInstance) {
        instance.physics.colliders.push({
            instanceId: otherInstance.instanceId,
            entityTypeName: otherInstance.entityTypeName,
            position: new Vector2D(otherInstance.transformation.position.x, otherInstance.transformation.position.y)
        });
    };

    this.update = function (delta) {
        for (var i = 0; i < physCompInstances.length; ++i) {
            var instance = physCompInstances[i];
            instance.physics.colliders = [];

            var collisionTypeDefinition = collisionTypeDefinitions[instance.physics.collisionTypeId];
            if (collisionTypeDefinition != "Static") {
                var transformation = instance.transformation;
                var newPosition = {
                    x: transformation.position.x + transformation.velocity.x * delta,
                    y: transformation.position.y + transformation.velocity.y * delta
                };
                var newBounding = instance.physics.boundingData.clone();
                newBounding.setPosition(newPosition);

                var hasNonGhostCollider = false;
                for (var j = 0; j < physCompInstances.length; ++j) {
                    if (j == i) {
                        continue;
                    }
                    // TODO: Optimize so we don't check the same two instances twice
                    var otherInstance = physCompInstances[j];
                    var otherBounding = otherInstance.physics.boundingData.clone();
                    otherBounding.setPosition(otherInstance.transformation.position);

                    // TODO: Tidy up math in collision functions, because right now it is bad and duplicated
                    if (physTypeDefinitions[otherInstance.physics.physTypeId] == "Circle") {
                        if (newBounding.collideWithBoundingCircle(otherBounding)) {
                            if (!hasNonGhostCollider && collisionTypeDefinitions[otherInstance.physics.collisionTypeId] != "Ghost") {
                                hasNonGhostCollider = true;
                            }
                            addColliders(instance, otherInstance);
                        }
                    } else if (physTypeDefinitions[otherInstance.physics.physTypeId] == "AABB") {
                        if (newBounding.collideWithBoundingAABB(otherBounding)) {
                            if (!hasNonGhostCollider && collisionTypeDefinitions[otherInstance.physics.collisionTypeId] != "Ghost") {
                                hasNonGhostCollider = true;
                            }
                            addColliders(instance, otherInstance);
                        }
                    }
                    // TODO: OBB
                }

                if (!hasNonGhostCollider || collisionTypeDefinition == "Ghost") {
                    instance.transformation.setPosition(newPosition.x, newPosition.y);
                }
            }
        }
    };

    this.shutdown = function (gameId) {
        return new Promise(function (resolve, reject) {
            var physTypeDefinitions = [];
            var collisionTypeDefinitions = [];
            var physCompDefinitions = [];
            while (physCompInstances.length > 0) {
                physCompInstances[0].destroy();
                physCompInstances.shift();
            }
        });
    };

    var createPhysCompInstance = function (entity, physCompId) {
        var physCompDefinition = physCompDefinitions[physCompId];
        var instance = new PhysicsComponentInstance(entity, physCompDefinition);
        physCompInstances.push(instance);
        messengerEngine.queueForPosting("createdPhysicsInstance", instance.physics, instance.instanceId);
    };

    var getPhysCompInstanceForEntityInstance = function (instanceId) {
        var physCompInstance = physCompInstances.firstOrNull(function (x) {
            return x.instanceId === instanceId;
        });
        if (physCompInstance != null) {
            messengerEngine.postImmediate("getPhysCompInstanceForEntityInstanceResponse", physCompInstance);
        }
    };

    var removePhysCompInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < physCompInstances.length; ++i) {
            var instance = physCompInstances[i];
            if (instance.instanceId == instanceId) {
                physCompInstances[i].destroy();
                physCompInstances.splice(i, 1);
                break;
            }
        }
    };

    messengerEngine.register("createPhysics", this, createPhysCompInstance);
    messengerEngine.register("getPhysCompInstanceForEntityInstanceRequest", this, getPhysCompInstanceForEntityInstance);
    messengerEngine.register("removeEntityInstance", this, removePhysCompInstanceFromMessage);
};