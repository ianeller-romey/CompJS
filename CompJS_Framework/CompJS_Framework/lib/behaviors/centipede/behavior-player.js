(function () {
    if (BehaviorPlayer === undefined) {
        var BehaviorPlayer = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var messengerEngine = globalMessengerEngine;
            var inputManager = globalInputManager;

            var godMode = false;

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

            this.update = function () {
                if (controllerLeft() && this.transformation.position.x > 28) {
                    this.transformation.velocity.x = -0.25;
                }
                else if (controllerRight() && this.transformation.position.x < 996) {
                    this.transformation.velocity.x = 0.25;
                }
                else {
                    this.transformation.velocity.x = 0.0;
                }

                if (controllerUp() && this.transformation.position.y > 600) {
                    this.transformation.velocity.y = -0.25;
                }
                else if (controllerDown() && this.transformation.position.y < 996) {
                    this.transformation.velocity.y = 0.25;
                }
                else {
                    this.transformation.velocity.y = 0.0;
                }

                if (controllerShoot()) {
                    messengerEngine.queueForPosting("createEntityInstance", "PlayerBullet", {
                        x: this.transformation.position.x + 13,
                        y: this.transformation.position.y - 13
                    });
                }
            };

            var setPlayerGodMode = function (bool) {
                godMode = bool;
            };

            messengerEngine.queueForPosting("setPointLightTransform", this.transformation);
            messengerEngine.register("setPlayerGodMode", this, setPlayerGodMode);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorPlayer", BehaviorPlayer);
    }
}());