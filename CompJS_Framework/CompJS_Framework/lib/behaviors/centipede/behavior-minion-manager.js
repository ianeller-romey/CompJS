(function () {
    if (BehaviorMinionManager === undefined) {
        var BehaviorMinionManager = function (entity) {
            this.instanceId = entity.instanceId;
            var currentWave = 0;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var createSpider = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Spider", {
                    position: {
                        x: 0,
                        y: 256
                    }
                });
            };

            var createScorpion = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Scorpion", {
                    position: {
                        x: 0,
                        y: 265
                    }
                });
            };

            var nextWave = function () {
                ++currentWave;
            };

            createSpider();
            createScorpion();

            messengerEngine.register("nextWave", this, nextWave);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMinionManager", BehaviorMinionManager);
    }
}());