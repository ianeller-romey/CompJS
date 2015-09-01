(function () {
    if (BehaviorScorpion === undefined) {
        var BehaviorScorpion = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            this.physComp = null;

            this.xDirection = null;
            var velocityAmount = .15;

            var messengerEngine = globalMessengerEngine;

            if (this.transformation.position.x > 256) {
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 0);
                this.transformation.setVelocity(-velocityAmount, 0.0);
                this.xDirection = function () {
                    return this.transformation.position.x <= -10;
                };
            } else {
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 1);
                this.transformation.setVelocity(velocityAmount, 0.0);
                this.xDirection = function () {
                    return this.transformation.position.x >= 528;
                };
            }

            this.update = function (delta) {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                } else {
                    if (this.xDirection()) {
                        messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);

                        messengerEngine.unregisterAll(this);
                    }

                    if (this.physComp != null) {
                        for (var i = 0; i < this.physComp.colliders.length; ++i) {
                            var c = this.physComp.colliders[i];
                            messengerEngine.queueForPosting("setBehaviorInstanceData", c.instanceId, { scorpionDamage: 1 });
                        }
                    }
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 1000);
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);

                messengerEngine.unregisterAll(this);
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

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorScorpion", BehaviorScorpion);
    }
}());