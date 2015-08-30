(function () {
    if (BehaviorMinionManager === undefined) {
        var BehaviorMinionManager = function (entity) {
            this.instanceId = entity.instanceId;
            var currentWave = -1;

            var fleaCounter = 0;
            var fleaRelease = 0;
            var mushroomWidth = 16; // use mushroomWidth instead of fleaWidth
            var viewportWidth = 512;
            var numColumns = 31;
            var columnStartPoint = 0 + (mushroomWidth / 2);
            var columnEndPoint = viewportWidth - (mushroomWidth / 2);

            var messengerEngine = globalMessengerEngine;

            var calculateFleaRelease = function () {
                fleaCounter = 0;
                fleaRelease = (Math.random() * 5000);
            };

            this.update = function (delta) {
                if (currentWave >= 1) {
                    fleaCounter += delta;
                    if (fleaCounter >= fleaRelease) {
                        messengerEngine.queueForPosting("createEntityInstance", "Flea", {
                            position: {
                                x: columnStartPoint + (Math.floor(Math.random() * numColumns) * mushroomWidth),
                                y: 0
                            }
                        });
                        calculateFleaRelease();
                    }
                }
            };

            var createSpider = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Spider", {
                    position: {
                        x: (Math.random() <= .5) ? 0 : 512,
                        y: 256
                    }
                });
            };

            var createScorpion = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Scorpion", {
                    position: {
                        x: (Math.random() <= .5) ? 0 : 512,
                        y: 256 - 8
                    }
                });
            };

            var nextWave = function () {
                ++currentWave;

                if (currentWave >= 0) {
                    createSpider();

                    if (currentWave >= 1) {
                        calculateFleaRelease();

                        if (currentWave >= 5) {
                            createScorpion();
                        }
                    }
                }
            };

            messengerEngine.register("nextWave", this, nextWave);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMinionManager", BehaviorMinionManager);
    }
}());