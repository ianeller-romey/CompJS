(function () {
    if (BehaviorLives === undefined) {
        var BehaviorLives = function (entity) {
            this.instanceId = entity.instanceId;

            var lives = 0;

            var scoreHeight = 16;
            var lifeWidth = 16;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var addLife = function () {
                if (lives < 5) {
                    ++lives;
                    messengerEngine.queueForPosting("createEntityInstance", "Life", {
                        position: {
                            x: lifeWidth * (lives - 1),
                            y: scoreHeight
                        }
                    });
                }
            };

            var removeLife = function () {
                if (lives > 0) {
                    messengerEngine.queueForPosting("removeLife", lives);
                    --lives;
                } else {
                    messengerEngine.queueForPosting("gameOver", true);
                }
            };
            
            var playerModifyLives = function (lives) {
                if (lives > 0) {
                    for (var i = 0; i < lives; ++i) {
                        addLife();
                    }
                } else if (lives <= 0) {
                    for (var i = 0; i > lives; --i) {
                        removeLife();
                    }
                }
            };

            messengerEngine.register("playerModifyLives", this, playerModifyLives);

            messengerEngine.queueForPosting("playerModifyLives", 2);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorLives", BehaviorLives);
    }
}());