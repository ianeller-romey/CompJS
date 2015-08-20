(function () {
    if (BehaviorPlayer === undefined) {
        var BehaviorPlayer = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var messengerEngine = globalMessengerEngine;
            var inputManager = globalInputManager;

            this.update = function () {
                if (inputManager.isPressed(inputManager.keys.arrowLeft) || inputManager.isPressed(inputManager.keys.a)) {
                    this.transformation.velocity.x = -250.0;
                }
                else if (inputManager.isPressed(inputManager.keys.arrowRight) || inputManager.isPressed(inputManager.keys.d)) {
                    this.transformation.velocity.x = 250.0;
                }
                else {
                    this.transformation.velocity.x = 0.0;
                }

                if (inputManager.isPressed(inputManager.keys.arrowUp) || inputManager.isPressed(inputManager.keys.w)) {
                    this.transformation.velocity.y = -250.0;
                }
                else if (inputManager.isPressed(inputManager.keys.arrowDown) || inputManager.isPressed(inputManager.keys.s)) {
                    this.transformation.velocity.y = 250.0;
                }
                else {
                    this.transformation.velocity.y = 0.0;
                }

                if (inputManager.isTriggered(inputManager.keys.space) || inputManager.isTriggered(inputManager.keys.enter)) {
                    messengerEngine.queueForPosting("createEntityInstance", "PlayerBullet", {
                        x: this.transformation.position.x + 13,
                        y: this.transformation.position.y - 13
                    });
                }
            };

            messengerEngine.queueForPosting("setPointLightTransform", this.transformation);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorPlayer", BehaviorPlayer);
    }
}());