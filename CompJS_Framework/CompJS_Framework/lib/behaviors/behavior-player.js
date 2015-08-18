(function () {
    if (BehaviorPlayer === undefined) {
        var BehaviorPlayer = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            var inputManager = globalInputManager;

            this.update = function () {
                if (inputManager.isArrowLeftPressed()) {
                    this.transformation.velocity.x = -250.0;
                }
                else if (inputManager.isArrowRightPressed()) {
                    this.transformation.velocity.x = 250.0;
                }
                else {
                    this.transformation.velocity.x = 0.0;
                }

                if (inputManager.isArrowUpPressed()) {
                    this.transformation.velocity.y = -250.0;
                }
                else if (inputManager.isArrowDownPressed()) {
                    this.transformation.velocity.y = 250.0;
                }
                else {
                    this.transformation.velocity.y = 0.0;
                }
            };
        };
    }

    globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorPlayer", BehaviorPlayer);

}());