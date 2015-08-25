(function () {
    if (BehaviorScorpion === undefined) {
        var BehaviorScorpion = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var messengerEngine = globalMessengerEngine;

            if (this.transformation.position.x > 512) {
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 0);
                this.transformation.velocity.x = -.30;
            }
            else {
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 1);
                this.transformation.velocity.x = .30;
            }

            this.update = function (delta) {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
            };

            messengerEngine.register("playerBulletDamage", this, this.playerBulletDamage);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorScorpion", BehaviorScorpion);
    }
}());