(function () {
    if (BehaviorCentipedeManager === undefined) {
        var BehaviorCentipedeManager = function (entity) {
            this.instanceId = entity.instanceId;

            var totalSegments = 1;
            var activeSegments = 0;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
                if (activeSegments == 0) {
                    messengerEngine.queueForPosting("nextLevel");
                    createCentipede();
                }
            };

            var createCentipede = function () {
                activeSegments = totalSegments;
                messengerEngine.queueForPosting("createEntityInstance", "CentipedeSegment", {
                    position: {
                        x: 0,
                        y: 0
                    },
                    data: {
                        parentSegment: null,
                        segmentId: 0,
                        totalSegments: totalSegments
                    }
                });
            };

            var centipedeSegmentDestroyed = function () {
                if (--activeSegments == totalSegments) {
                    globalMessengerEngine.queueForPosting("nextWave", true);
                }
            };

            messengerEngine.register("centipedeSegmentDestroyed", this, centipedeSegmentDestroyed);

            createCentipede();
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeManager", BehaviorCentipedeManager);
    }
}());