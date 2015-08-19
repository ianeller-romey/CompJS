(function () {
    if (BehaviorPlayerBullet === undefined) {
        globalMessengerEngine.addMessageType("playerBulletDamage");

        var BehaviorPlayerBullet = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;
            this.transformation.velocity.y = -350;
            this.physComp = null;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
                if (this.physComp != null) {
                    if (this.transformation.position.y <= 0) {
                        messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                    }

                    for (var i = 0; i < this.physComp.colliders.length; ++i) {
                        var c = this.physComp.colliders[i];
                        if (c.entityName != "Player") {
                            messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                            messengerEngine.queueForPosting("playerBulletDamage", c.instanceId);
                        }
                    };
                }
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId == this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorPlayerBullet", BehaviorPlayerBullet);
    }
}());