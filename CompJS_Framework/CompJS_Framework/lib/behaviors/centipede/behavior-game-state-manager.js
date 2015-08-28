(function () {
    if (BehaviorGameStateManager === undefined) {
        var BehaviorGameStateManager = function (entity) {
            this.instanceId = entity.instanceId;
            var playerLives = 0;
            var currentWave = 0;

            var messengerEngine = globalMessengerEngine;

            var playerModifyLives = function (num) {
                if (num !== undefined) {
                    playerLives += num;
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

            messengerEngine.register("playerModifyLives", this, playerModifyLives);
            messengerEngine.register("nextWave", this, nextWave);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorGameStateManager", BehaviorGameStateManager);
    }
}());