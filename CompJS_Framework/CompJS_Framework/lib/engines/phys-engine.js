
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
            }
            else if (physType == "AABB") {
                boundingData = new BoundingAABB(JSON.parse(x.boundingData));
            }
            physCompDefinitions[x.id] = {
                physTypeId: x.physTypeId,
                collisionTypeId: x.collisionTypeId,
                boundingData: boundingData
            };
        });
    };

    this.init = function () {
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
                servicesEngine.retrieveAllPhysComps().then(function (data) {
                    buildPhysCompDefinitions(data);
                    resolve();
                });
            });
        });

        return ;
    };

    this.update = function (delta) {
        for (var i = 0; i < physCompInstances.length; ++i) {
            var instance = physCompInstances[i];
            instance.physComp.colliders = [];

            var collisionTypeDefinition = collisionTypeDefinitions[instance.physComp.collisionTypeId];
            if (collisionTypeDefinition != "Static") {
                var transformation = instance.transformation;
                var newPosition = {
                    x: transformation.position.x + transformation.velocity.x * delta,
                    y: transformation.position.y + transformation.velocity.y * delta
                };
                var newBounding = instance.physComp.boundingData.clone();
                newBounding.setPosition(newPosition);

                var hasNonGhostCollider = false;
                for (var j = 0; j < physCompInstances.length; ++j) {
                    if (j == i) {
                        continue;
                    }
                    // TODO: Optimize so we don't check the same two instances twice
                    var otherInstance = physCompInstances[j];
                    var otherBounding = otherInstance.physComp.boundingData.clone();
                    otherBounding.setPosition(otherInstance.transformation.position);

                    // TODO: Tidy up math in collision functions, because right now it is bad and duplicated
                    if (physTypeDefinitions[otherInstance.physComp.physTypeId] == "Circle") {
                        if (newBounding.collideWithBoundingCircle(otherBounding)) {
                            if (!hasNonGhostCollider && collisionTypeDefinitions[otherInstance.physComp.collisionTypeId] != "Ghost") {
                                hasNonGhostCollider = true;
                            }
                            instance.physComp.colliders.push({
                                instanceId: otherInstance.instanceId,
                                entityName: otherInstance.entityName
                            });
                        }
                    }
                    else if (physTypeDefinitions[otherInstance.physComp.physTypeId] == "AABB") {
                        if (newBounding.collideWithBoundingAABB(otherBounding)) {
                            if (!hasNonGhostCollider && collisionTypeDefinitions[otherInstance.physComp.collisionTypeId] != "Ghost") {
                                hasNonGhostCollider = true;
                            }
                            instance.physComp.colliders.push({
                                instanceId: otherInstance.instanceId,
                                entityName: otherInstance.entityName
                            });
                        }
                    }
                    // TODO: OBB
                }

                if (!hasNonGhostCollider || collisionTypeDefinition == "Ghost") {
                    instance.transformation.position.x = newPosition.x;
                    instance.transformation.position.y = newPosition.y;
                }
            }
        }
    };

    var createPhysCompInstance = function (entity, physCompId) {
        var physCompDefinition = physCompDefinitions[physCompId];
        var instance = {
            instanceId: entity.instanceId,
            entityName: entity.name,
            transformation: entity.transformation,
            physComp: {
                physTypeId: physCompDefinition.physTypeId,
                collisionTypeId: physCompDefinition.collisionTypeId,
                boundingData: physCompDefinition.boundingData,
                colliders: []
            }
        };
        physCompInstances.push(instance);
        messengerEngine.queueForPosting("createdPhysicsInstance", instance.physComp, instance.instanceId);
    };

    var removePhysCompInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < physCompInstances.length; ++i) {
            var instance = physCompInstances[i];
            if (instance.instanceId == instanceId) {
                physCompInstances.splice(i, 1);
                break;
            }
        }
    };

    messengerEngine.register("createPhysics", this, createPhysCompInstance);
    messengerEngine.register("removeEntityInstance", this, removePhysCompInstanceFromMessage);
};