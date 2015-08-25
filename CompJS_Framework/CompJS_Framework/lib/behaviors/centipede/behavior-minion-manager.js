(function () {
    if (BehaviorMinionManager === undefined) {
        var BehaviorMinionManager = function (entity) {
            this.instanceId = entity.instanceId;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var createSpider = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Spider", {
                    x: 0,
                    y: 512
                });
            };

            var createScorpion = function () {
                messengerEngine.queueForPosting("createEntityInstance", "Scorpion", {
                    x: 0,
                    y: 512
                });
            };

            createSpider();
            createScorpion();
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMinionManager", BehaviorMinionManager);
    }
}());