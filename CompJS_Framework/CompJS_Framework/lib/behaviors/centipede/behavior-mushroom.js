(function () {
    if (BehaviorMushroom === undefined) {
        var BehaviorMushroom = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var currentAnimationFrame = 0;
            var isPoisoned = false;

            var messengerEngine = globalMessengerEngine;

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 1);
                if (++currentAnimationFrame > 3) {
                    messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
                } else {
                    messengerEngine.queueForPosting("setInstanceAnimationFrame", this.instanceId, currentAnimationFrame);
                }
            };

            this.update = function () {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                } else if (!isPoisoned && this.data["scorpionDamage"] !== undefined) {
                    isPoisoned = true;
                    messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 1);
                }
            };
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroom", BehaviorMushroom);
    }
}());