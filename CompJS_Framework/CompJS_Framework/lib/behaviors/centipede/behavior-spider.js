(function () {
    if (BehaviorSpider === undefined) {
        var BehaviorSpider = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            this.physComp = null;

            var playerInstanceId = null;
            var playerPosition = null;

            var durationSwitchDirection = 750;
            var durationCurrent = durationSwitchDirection;
            var velocityAmount = .15;

            var messengerEngine = globalMessengerEngine;

            this.update = function (delta) {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                } else {
                    if (this.transformation.position.x >= 1000) {
                        this.switchDirectionX(-velocityAmount);
                        this.switchDirectionY();
                        durationCurrent = 0;
                    } else if (this.transformation.position.x <= 24) {
                        this.switchDirectionX(velocityAmount);
                        this.switchDirectionY();
                        durationCurrent = 0;
                    }

                    if (this.transformation.position.y >= 1000) {
                        this.switchDirectionX();
                        this.switchDirectionY(-velocityAmount);
                        durationCurrent = 0;
                    } else if (this.transformation.position.y <= 24) {
                        this.switchDirectionX();
                        this.switchDirectionY(velocityAmount);
                        durationCurrent = 0;
                    } else {
                        durationCurrent += delta;
                        if (durationCurrent >= durationSwitchDirection) {
                            this.switchDirection();
                            durationCurrent = 0;
                        }
                    }

                    if (this.physComp != null) {
                        for (var i = 0; i < this.physComp.colliders.length; ++i) {
                            var c = this.physComp.colliders[i];
                            messengerEngine.queueForPosting("setBehaviorInstanceData", c.instanceId, { spiderDamage: 1 });
                        };
                    }
                }
            };

            this.switchDirectionX = function (x) {
                if (x === undefined) {
                    x = (Math.random() * 100 >= 50) ? velocityAmount : -velocityAmount;
                }
                this.transformation.velocity.x = x;
            }

            this.switchDirectionY = function (y) {
                if (y === undefined) {
                    y = (Math.random() * 100 >= 50) ? velocityAmount : -velocityAmount;
                }
                this.transformation.velocity.y = y;
            }

            this.switchDirection = function () {
                this.switchDirectionX();
                this.switchDirectionY();
            };

            this.playerBulletDamage = function () {
                if (playerPosition != null) {
                    // Calculate score based on distance
                }
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId == this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            var getPlayerInstanceId = function (instanceId) {
                playerInstanceId = instanceId;
                messengerEngine.unregister("getPlayerInstanceIdResponse", getPlayerInstanceId);
                messengerEngine.queueForPosting("getTransformationForEntityInstanceRequest", playerInstanceId);
            };

            var getPlayerTransformation = function (instanceId, transformation) {
                if (playerInstanceId == instanceId) {
                    playerPosition = transformation.position;
                    messengerEngine.unregister("getTransformationForEntityInstanceResponse", getPlayerTransformation);
                }
            };

            messengerEngine.register("playerBulletDamage", this, this.playerBulletDamage);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);
            messengerEngine.register("getPlayerInstanceIdResponse", this, getPlayerInstanceId);
            messengerEngine.register("getTransformationForEntityInstanceResponse", this, getPlayerTransformation);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorSpider", BehaviorSpider);
    }
}());