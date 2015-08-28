(function () {
    if (BehaviorCentipedeSegment === undefined) {
        var BehaviorCentipedeSegment = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;
            
            this.physComp = null;

            var parentSegment = null;
            var segmentId = null;
            var totalSegments = null;

            var velocityAmountX = .10;
            var velocityAmountY = -.30;

            var stateInitializing = 0;
            var stateMovingHorizontal = 1;
            var stateMovingVertical = 2;
            var statePoisoned = 3;
            var state = stateInitializing;

            var segmentHeight = 16;
            var segmentRow = segmentHeight / 2;

            var messengerEngine = globalMessengerEngine;

            this.init = function () {
                parentSegment = this.data["parentSegment"];
                segmentId = this.data["segmentId"];
                totalSegments = this.data["totalSegments"];

                var nextSegmentId = segmentId + 1;
                if (nextSegmentId < totalSegments) {
                    messengerEngine.queueForPosting("createEntityInstance", "CentipedeSegment", {
                        position: {
                            x: 0,
                            y: 0
                        },
                        data: {
                            parentSegment: segmentId,
                            segmentId: nextSegmentId,
                            totalSegments: totalSegments
                        }
                    });
                }
            };

            this.setMovingHorizontal = function () {
                velocityAmountX = -velocityAmountX;
                this.transformation.velocity.x = velocityAmountX;
                this.transformation.velocity.y = 0.0;
                state = stateMovingHorizontal;
            };

            this.setMovingVertical = function () {
                this.transformation.velocity.x = 0.0;
                this.transformation.velocity.y = velocityAmountY;
                state = stateMovingVertical;
            };

            this.update = function () {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                } else {
                    switch (state) {
                        case stateInitializing:
                            if (segmentId === null && this.data["segmentId"] !== undefined) {
                                this.init();
                            }
                            if (this.physComp !== null) {
                                this.setMovingHorizontal();
                            }
                            break;

                        case stateMovingHorizontal:
                            for (var i = 0; i < this.physComp.colliders.length; ++i) {
                                var c = this.physComp.colliders[i];
                                if (c.entityTypeName === "Mushroom") {
                                    this.setMovingVertical();
                                }
                            }
                            break;

                        case stateMovingVertical:
                            if (this.transformation.position.y % segmentRow <= .1) {
                                this.setMovingHorizontal();
                            }
                            break;
                    }
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 10);
                messengerEngine.queueForPosting("centipedeSegmentDestroyed", segmentId);
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
            };

            var centipedeSegmentDestroyed = function (segmentId) {
                if (segmentId == parentSegment) {
                    // TODO: become a head
                }
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId == this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("centipedeSegmentDestroyed", this, centipedeSegmentDestroyed);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeSegment", BehaviorCentipedeSegment);
    }
}());