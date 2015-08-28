(function () {
    if (BehaviorGameStateManager === undefined) {
        var BehaviorGameStateManager = function (entity) {
            this.instanceId = entity.instanceId;

            var currentWave = -1;
            var waveColors = {
            };

            var messengerEngine = globalMessengerEngine;

            var playerDeath = function () {
                messengerEngine.queueForPosting("playerModifyLives", -1);
                messengerEngine.queueForPosting("halftime", true);
            };

            var halftime = function (start) {
                if (!start) {
                    messengerEngine.queueForPosting("nextWave", true);
                }
            };

            var nextWave = function () {
                ++currentWave;
                messengerEngine.queueForPosting("setColorInversion", {
                    r: Math.random(),
                    g: Math.random(),
                    b: Math.random()
                });
            };

            this.update = function () {
            };

            messengerEngine.register("playerDeath", this, playerDeath);
            messengerEngine.register("halftime", this, halftime);
            messengerEngine.register("nextWave", this, nextWave);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorGameStateManager", BehaviorGameStateManager);
    }
}());