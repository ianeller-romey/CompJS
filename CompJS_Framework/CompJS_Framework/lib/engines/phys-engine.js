
var PhysEngine = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var physTypeDefinitions = [];
    var collisionTypeDefinitions = [];
    var physCompDefinition = [];
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
            else if (physType == "Rect") {
                throw "Not implemented yet.";
            }
            physCompDefinition[x.id] = {
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

    var createPhysCompInstance = function (entity, physCompId) {
        var instance = {
            instanceId: entity.instanceId,
            entityName: entity.name,
            transformation: entity.transformation,
            physComp: physCompDefinition[physCompId],
            colliders: []
        };
        physCompInstances.push(instance);
        messengerEngine.queueForPosting("createdPhysicsInstance", instance);
    };

    this.update = function (delta) {
        for (var i = 0; i < physCompInstances.length; ++i) {
            var instance = physCompInstances[i];
            instance.colliders = [];

            var collisionTypeDefinition = collisionTypeDefinitions[instance.physComp.collisionTypeId];
            if (collisionTypeDefinition != "Static") {
                var transformation = instance.transformation;
                var newPosition = {
                    x: transformation.position.x + transformation.velocity.x * delta,
                    y: transformation.position.y + transformation.velocity.y * delta
                };
                var newBounding = instance.physComp.boundingData.clone();
                newBounding.setPosition(newPosition);

                var hasCollider = false;
                for (var j = 0; j < physCompInstances.length; ++j) {
                    if (j == i) {
                        continue;
                    }
                    // TODO: Optimize so we don't check the same two instances twice
                    var otherInstance = physCompInstances[j];
                    var otherBounding = otherInstance.physComp.boundingData.clone();
                    otherBounding.setPosition(otherInstance.transformation.position);

                    if (physTypeDefinitions[otherInstance.physComp.physTypeId] == "Circle") {
                        if (newBounding.collideWithBoundingCircle(otherBounding)) {
                            hasCollider = true;
                            instance.colliders.push(otherInstance.entityName);
                        }
                    }
                    else if (physTypeDefinitions[otherInstance.physComp.physTypeId] == "Rect") {
                        throw "Not implemented yet.";
                    }
                }

                if (!hasCollider || collisionTypeDefinition == "Ghost") {
                    instance.transformation.position.x = newPosition.x;
                    instance.transformation.position.y = newPosition.y;
                }
            }
        }
    };

    messengerEngine.register("createPhysics", this, createPhysCompInstance);
};