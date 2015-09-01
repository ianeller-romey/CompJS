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
                    if (this.transformation.position.x >= 512) {
                        this.transformation.setVelocity(this.switchDirectionX(-velocityAmount), this.switchDirectionY());
                        durationCurrent = 0;
                    } else if (this.transformation.position.x <= 0) {
                        this.transformation.setVelocity(this.switchDirectionX(velocityAmount), this.switchDirectionY());
                        durationCurrent = 0;
                    }

                    if (this.transformation.position.y >= 512) {
                        this.transformation.setVelocity(this.switchDirectionX(), this.switchDirectionY(-velocityAmount));
                        durationCurrent = 0;
                    } else if (this.transformation.position.y <= 0) {
                        this.transformation.setVelocity(this.switchDirectionX(), this.switchDirectionY(velocityAmount));
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
                    var rand = Math.random();
                    if (rand <= .33) {
                        x = velocityAmount;
                    } else if (rand > .33 && rand <= .66) {
                        x = -velocityAmount;
                    } else {
                        x = 0.0;
                    }
                }
                return x;
            }

            this.switchDirectionY = function (y) {
                if (y === undefined) {
                    y = (Math.random() < .5)  ? velocityAmount : -velocityAmount;
                }
                return y;
            }

            this.switchDirection = function () {
                this.transformation.setVelocity(this.switchDirectionX(), this.switchDirectionY());
            };

            this.playerBulletDamage = function () {
                if (playerPosition != null) {
                    var dist = this.transformation.position.distance(playerPosition);
                    if (dist <= 64) {
                        messengerEngine.queueForPosting("incrementPlayerScore", 900);
                    } else if (dist > 64 && dist <= 256) {
                        messengerEngine.queueForPosting("incrementPlayerScore", 600);
                    } else {
                        messengerEngine.queueForPosting("incrementPlayerScore", 300);
                    }
                }
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);

                messengerEngine.unregisterAll(this);
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

            messengerEngine.queueForPosting("getPlayerInstanceIdRequest", true);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorSpider", BehaviorSpider);
    }
}());