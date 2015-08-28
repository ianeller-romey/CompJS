(function () {
    if (BehaviorFlea === undefined) {
        var BehaviorFlea = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            this.physComp = null;

            var numRows = 18;
            var viewportHeight = 1024;
            var mushroomHeight = 52;
            var rowStartPoint = ((viewportHeight - (numRows * mushroomHeight)) / 2) + (mushroomHeight);
            var rowEndPoint = rowStartPoint + (numRows * mushroomHeight) - mushroomHeight * 2;
            
            var readyToDrop = false;
            var readyTimer = 0.0;
            var getReadyTimer = function () {
                return Math.random() * 1000;
            };

            var hitState = 0;

            var messengerEngine = globalMessengerEngine;

            this.transformation.velocity.y = 0.30;

            this.update = function (delta) {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                } else if (this.physComp != null) {
                    if (this.transformation.position.y >= 1034) {
                        // fell off the map
                        messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                    } else {
                        var distance = (this.transformation.position.y - rowStartPoint) % 52;
                        if (readyToDrop){
                            if (distance <= 1.0) {
                                // ready to drop a mushroom, and close enough to drop a mushroom
                                var createAt = {
                                    x: this.transformation.position.x,
                                    y: this.transformation.position.y - distance
                                };
                                messengerEngine.queueForPosting("createEntityInstance", "Mushroom", createAt);
                                readyToDrop = false;
                            }
                        } else {
                            if (distance > 1.0 && readyTimer <= 0.0) {
                                // too far to drop a mushroom, and need to start the timer
                                readyTimer = getReadyTimer();
                            } else {
                                // timer is running, so update it
                                readyTimer -= delta;
                                if (readyTimer <= 0.0) {
                                    readyToDrop = true;
                                }
                            }
                        }
                    }

                    for (var i = 0; i < this.physComp.colliders.length; ++i) {
                        var c = this.physComp.colliders[i];
                        messengerEngine.queueForPosting("setBehaviorInstanceData", c.instanceId, { fleaDamage: 1 });
                    };
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 200);
                if (hitState == 0) {
                    hitState = 1;
                    this.transformation.velocity.y = this.transformation.velocity.y * 1.5;
                } else {
                    messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                }
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId == this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("playerBulletDamage", this, this.playerBulletDamage);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorFlea", BehaviorFlea);
    }
}());