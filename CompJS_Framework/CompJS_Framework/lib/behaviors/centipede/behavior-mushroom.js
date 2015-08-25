(function () {
    if (BehaviorMushroom === undefined) {
        var BehaviorMushroom = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;
            this.currentAnimationState = 0;

            var messengerEngine = globalMessengerEngine;

            this.playerBulletDamage = function () {
                if (++this.currentAnimationState > 3) {
                    messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                }
                else {
                    messengerEngine.queueForPosting("setInstanceAnimationFrame", this.instanceId, this.currentAnimationState);
                }
            };

            this.update = function () {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                }
            };
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroom", BehaviorMushroom);
    }
}());