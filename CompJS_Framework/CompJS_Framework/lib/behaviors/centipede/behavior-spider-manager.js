(function () {
    if (BehaviorSpiderManager === undefined) {
        var BehaviorSpiderManager = function (entity) {
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

            createSpider();
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorSpiderManager", BehaviorSpiderManager);
    }
}());