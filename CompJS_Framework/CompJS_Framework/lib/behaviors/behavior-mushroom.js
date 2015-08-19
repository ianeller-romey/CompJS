(function () {
    if (BehaviorMushroom === undefined) {
        var BehaviorMushroom = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;
            this.currentAnimationState = 0;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            this.playerBulletDamage = function (instanceId) {
                if (instanceId == this.instanceId) {
                    if (++this.currentAnimationState > 3) {
                        messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                    }
                    else {
                        messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, this.currentAnimationState);
                    }
                }
            };

            messengerEngine.register("playerBulletDamage", this, this.playerBulletDamage);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroom", BehaviorMushroom);
    }
}());