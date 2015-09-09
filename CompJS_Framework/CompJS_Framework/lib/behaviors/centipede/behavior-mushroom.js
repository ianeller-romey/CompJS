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
                } else if (this.data["reset"] !== undefined) {
                    messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, 0);
                    messengerEngine.queueForPosting("setInstanceAnimationFrame", this.instanceId, 0);
                    currentAnimationFrame = 0;
                    isPoisoned = false;
                }
            };

            this.getAllDamagedMushrooms = function () {
                if (currentAnimationFrame > 0 || isPoisoned) {
                    messengerEngine.postImmediate("getAllDamagedMushroomsResponse", this.instanceId);
                }
            }

            messengerEngine.register("getAllDamagedMushroomsRequest", this, this.getAllDamagedMushrooms);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroom", BehaviorMushroom);
    }
}());