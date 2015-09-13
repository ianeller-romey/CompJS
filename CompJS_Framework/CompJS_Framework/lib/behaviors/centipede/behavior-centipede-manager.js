(function () {
    if (BehaviorCentipedeManager === undefined) {
        var BehaviorCentipedeManager = function (entity) {
            this.instanceId = entity.instanceId;

            var totalSegments = 10;
            var activeSegments = 0;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var nextWave = function () {
                createCentipede();
            };

            var createCentipede = function () {
                activeSegments = totalSegments;
                messengerEngine.queueForPosting("createEntityInstance", "CentipedeSegment", {
                    position: {
                        x: 512,
                        y: 8
                    },
                    data: {
                        nextTransformation: null,
                        nextSegment: null,
                        segmentId: 0,
                        totalSegments: totalSegments
                    }
                });
                messengerEngine.postImmediate("playAudio", "Centipede");
            };

            var centipedeSegmentDestroyed = function () {
                if (--activeSegments == 0) {
                    globalMessengerEngine.queueForPosting("nextWave", true);
                    messengerEngine.postImmediate("stopAudio", "Centipede");
                }
            };

            var playerDeath = function () {
                activeSegments = 0;
                messengerEngine.postImmediate("stopAudio", "Centipede");
            };

            messengerEngine.register("nextWave", this, nextWave);
            messengerEngine.register("centipedeSegmentDestroyed", this, centipedeSegmentDestroyed);
            messengerEngine.register("playerDeath", this, playerDeath);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeManager", BehaviorCentipedeManager);
    }
}());