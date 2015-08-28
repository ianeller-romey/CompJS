(function () {
    if (BehaviorLives === undefined) {
        var BehaviorLives = function (entity) {
            this.instanceId = entity.instanceId;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorLives", BehaviorLives);
    }
}());