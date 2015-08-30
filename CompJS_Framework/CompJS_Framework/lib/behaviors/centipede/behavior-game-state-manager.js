(function () {
    if (BehaviorGameStateManager === undefined) {
        var BehaviorGameStateManager = function (entity) {
            this.instanceId = entity.instanceId;

            var currentWave = -1;
            var waveColors = [{
                r: 0,
                g: 0,
                b: 0
            }, {
                r: 0,
                g: -1,
                b: .75
            }, {
                r: 0,
                g: 1,
                b: .25
            }, {
                r: 1,
                g: -.5,
                b: -1
            }];

            var messengerEngine = globalMessengerEngine;

            var playerDeath = function () {
                messengerEngine.queueForPosting("playerModifyLives", -1);
                messengerEngine.queueForPosting("halftime", true);
            };

            var halftime = function (start) {
                if (!start) {
                    messengerEngine.queueForPosting("nextWave", true);
                    messengerEngine.queueForPosting("createEntityInstance", "Player", {
                        position: {
                            x: 256,
                            y: 490
                        }
                    });
                }
            };

            var nextWave = function () {
                ++currentWave;
                var currentColor = currentWave % waveColors.length;
                messengerEngine.queueForPosting("setColorInversion", {
                    r: waveColors[currentColor].r,
                    g: waveColors[currentColor].g,
                    b: waveColors[currentColor].b,
                });
            };

            this.update = function () {
            };

            messengerEngine.register("playerDeath", this, playerDeath);
            messengerEngine.register("halftime", this, halftime);
            messengerEngine.register("nextWave", this, nextWave);

            messengerEngine.postImmediate("createEntityInstance", "MushroomManager");
            messengerEngine.postImmediate("createEntityInstance", "CentipedeManager");
            messengerEngine.postImmediate("createEntityInstance", "MinionManager");
            messengerEngine.postImmediate("createEntityInstance", "Score");
            messengerEngine.postImmediate("createEntityInstance", "Lives");
            halftime(false);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorGameStateManager", BehaviorGameStateManager);
    }
}());