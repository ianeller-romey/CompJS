(function () {
    if (BehaviorPlayer === undefined) {
        var BehaviorPlayer = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var messengerEngine = globalMessengerEngine;
            var inputManager = globalInputManager;

            var godMode = true;

            var controllerLeft = function () {
                return inputManager.isPressed(inputManager.keys.arrowLeft) || inputManager.isPressed(inputManager.keys.a);
            };

            var controllerRight = function () {
                return inputManager.isPressed(inputManager.keys.arrowRight) || inputManager.isPressed(inputManager.keys.d);
            };

            var controllerUp = function () {
                return inputManager.isPressed(inputManager.keys.arrowUp) || inputManager.isPressed(inputManager.keys.w);
            };

            var controllerDown = function () {
                return inputManager.isPressed(inputManager.keys.arrowDown) || inputManager.isPressed(inputManager.keys.s);
            };

            var controllerShoot = function () {
                return inputManager.isTriggered(inputManager.keys.space) || inputManager.isTriggered(inputManager.keys.enter)
            };

            var playerDeath = function () {
                if (!godMode) {
                    messengerEngine.queueForPosting("playerDeath", true);
                }
            };

            this.update = function () {
                if (this.data["spiderDamage"] !== undefined || this.data["scorpionDamage"] !== undefined || this.data["fleaDamage"] !== undefined || this.data["centipedeDamage"] !== undefined) {
                    playerDeath();
                }

                if (controllerLeft() && this.transformation.position.x > 4) {
                    this.transformation.velocity.x = -0.25;
                } else if (controllerRight() && this.transformation.position.x < 500) {
                    this.transformation.velocity.x = 0.25;
                } else {
                    this.transformation.velocity.x = 0.0;
                }

                if (controllerUp() && this.transformation.position.y > 402) {
                    this.transformation.velocity.y = -0.25;
                } else if (controllerDown() && this.transformation.position.y < 500) {
                    this.transformation.velocity.y = 0.25;
                } else {
                    this.transformation.velocity.y = 0.0;
                }

                if (controllerShoot()) {
                    messengerEngine.queueForPosting("createEntityInstance", "PlayerBullet", {
                        position: {
                            x: this.transformation.position.x + 7,
                            y: this.transformation.position.y - 7
                        }
                    });
                }
            };

            var setPlayerGodMode = function (bool) {
                godMode = bool;
            };

            this.getPlayerInstanceId = function () {
                messengerEngine.queueForPosting("getPlayerInstanceIdResponse", this.instanceId);
            };

            messengerEngine.register("setPlayerGodMode", this, setPlayerGodMode);
            messengerEngine.register("getPlayerInstanceIdRequest", this, this.getPlayerInstanceId);

            messengerEngine.queueForPosting("setPointLightTransform", this.transformation);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorPlayer", BehaviorPlayer);
    }
}());