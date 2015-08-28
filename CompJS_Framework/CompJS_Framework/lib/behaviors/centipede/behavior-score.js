(function () {
    if (BehaviorScore === undefined) {
        var BehaviorScore = function (entity) {
            this.instanceId = entity.instanceId;

            var score = 0;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var incrementPlayerScore = function (scoreIncr) {
                score += scoreIncr;
            };

            messengerEngine.register("incrementPlayerScore", this, incrementPlayerScore);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorScore", BehaviorScore);
    }
}());