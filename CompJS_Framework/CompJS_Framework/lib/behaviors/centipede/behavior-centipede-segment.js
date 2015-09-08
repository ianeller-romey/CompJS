(function () {
    if (BehaviorCentipedeSegment === undefined) {
        var BehaviorCentipedeSegment = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;

            this.physComp = null;

            var nextSegment = null;
            var prevSegment = null;
            var segmentId = null;
            var totalSegments = null;

            var prevSegmentInstanceId = null;
            var prevSegmentBehavior = null;

            var velocityAmountX = .05;
            var velocityAmountY = .025;

            var stateInitializing = 0;
            var stateMovingHorizontal = 1;
            var stateMovingVertical = 2;
            var statePoisoned = 3;
            var state = stateInitializing;
            var isHead = false;
            var isTemporaryHead = false;

            var turnaroundStarts = [];
            var turnaroundEnds = [];

            var segmentWidth = 16;
            var segmentHalfWidth = segmentWidth / 2;
            var segmentHeight = 16;
            var segmentHalfHeight = segmentHeight / 2;
            var segmentRow = segmentHeight;

            var messengerEngine = globalMessengerEngine;

            this.isMovingLeft = function (xVelocity) {
                return (xVelocity != null) ? xVelocity < 0 : this.transformation.velocity.x < 0;
            };

            this.init = function () {
                nextSegment = this.data["nextSegment"];
                segmentId = this.data["segmentId"];
                totalSegments = this.data["totalSegments"];

                if (nextSegment === null) {
                    isHead = true;
                }

                var nextSegmentId = segmentId + 1;
                if (nextSegmentId < totalSegments) {
                    messengerEngine.queueForPosting("createEntityInstance", "CentipedeSegment", {
                        position: new Vector2D(this.transformation.position.x + segmentWidth, this.transformation.position.y),
                        data: {
                            nextSegment: segmentId,
                            segmentId: nextSegmentId,
                            totalSegments: totalSegments
                        }
                    });
                }

                messengerEngine.queueForPosting("centipedeSegmentCreated", segmentId, this.instanceId, this);
            };

            this.setAnimationState = function (xVelocity) {
                var animationState;
                if (isHead) {
                    animationState = (xVelocity > 0) ? 0 : 1;
                } else {
                    animationState = (xVelocity > 0) ? 2 : 3;
                }
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, animationState);
            };

            this.setMovingHorizontal = function () {
                if (isHead) {
                    velocityAmountX = -velocityAmountX;
                    this.transformation.setVelocity(velocityAmountX, 0.0);
                } else {
                    this.transformation.setVelocity(0.0, 0.0);
                }

                state = stateMovingHorizontal;
                this.setAnimationState(velocityAmountX);
            };

            this.setMovingVertical = function () {
                if ((this.transformation.position.y >= 488 && velocityAmountY > 0) ||
                    (this.transformation.position.y <= 8 && velocityAmountY < 0)) {
                    velocityAmountY = -velocityAmountY;
                }
                this.transformation.setVelocity(0.0, velocityAmountY);

                state = stateMovingVertical;
            };

            this.update = function () {
                if (this.data["playerBulletDamage"] !== undefined || this.transformation.position.x > (512 + segmentWidth) || this.transformation.position.x < -segmentWidth) {
                    this.playerBulletDamage();
                } else {
                    switch (state) {
                        case stateInitializing:
                            if (segmentId === null && this.data["segmentId"] !== undefined) {
                                this.init();
                                if (isHead) {
                                    this.setMovingHorizontal();
                                }
                            }
                            break;

                        case stateMovingHorizontal:
                            if (isHead) {
                                if ((this.isMovingLeft() && this.transformation.position.x <= 8) ||
                                    (!this.isMovingLeft() && this.transformation.position.x >= 504)) {
                                    this.headSetTurnaround();
                                }
                                for (var i = 0; i < this.physComp.colliders.length; ++i) {
                                    var c = this.physComp.colliders[i];
                                    if (c.entityTypeName === "Mushroom") {
                                        this.headSetTurnaround();
                                    }
                                }
                                this.centipedeSetPosition(this.transformation.position, this.transformation.velocity.x);
                            } else if (isTemporaryHead) {
                                if (turnaroundStarts.length > 0) {
                                    var turnaroundPosition = turnaroundStarts[0];
                                    if (this.transformation.position.y.valueOf() === turnaroundPosition.y.valueOf()) {
                                        if ((!this.isMovingLeft() && this.transformation.position.x.valueOf() >= turnaroundPosition.x.valueOf()) ||
                                            (this.isMovingLeft() && this.transformation.position.x.valueOf() <= turnaroundPosition.x.valueOf())) {
                                            this.transformation.setPosition(turnaroundPosition.x, this.transformation.position.y);

                                            this.headSetTurnaround();
                                        }
                                    }
                                }
                                this.centipedeSetPosition(this.transformation.position, this.transformation.velocity.x);
                            }
                            break;

                        case stateMovingVertical:
                            var turnaroundPosition = turnaroundStarts[0];
                            var turnaroundFinal = turnaroundEnds[0];

                            if (this.transformation.velocity.y > 0) {
                                if (this.transformation.position.y >= turnaroundFinal.y) {
                                    this.transformation.setPosition(this.transformation.position.x, turnaroundFinal.y);

                                    this.setMovingHorizontal();

                                    turnaroundStarts.shift();
                                    turnaroundEnds.shift();
                                }
                            } else {
                                var turnaroundFinalY = turnaroundPosition.y - segmentHeight;
                                if (this.transformation.position.y <= turnaroundFinal.y) {
                                    this.transformation.setPosition(this.transformation.position.x, turnaroundFinal.y);

                                    this.setMovingHorizontal();

                                    turnaroundStarts.shift();
                                    turnaroundEnds.shift();
                                }
                            }
                            break;
                    }
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 10);
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);

                var mushroomOffsetX = (this.transformation.velocity.x > 0)
                    ? (this.transformation.position.x - (this.transformation.position.x % segmentWidth)) + segmentWidth
                    : this.transformation.position.x - (this.transformation.position.x % segmentWidth);
                var mushroomOffsetY = (this.transformation.velocity.y > 0)
                    ? (this.transformation.position.y - (this.transformation.position.y % segmentHeight)) + segmentHeight
                    : this.transformation.position.y - (this.transformation.position.y % segmentHeight);
                messengerEngine.postImmediate("createEntityInstance", "MushroomWaiter", {
                    position: {
                        x: mushroomOffsetX + segmentHalfWidth,
                        y: mushroomOffsetY + segmentHalfHeight
                    }
                });

                messengerEngine.postImmediate("centipedeSegmentDestroyed", segmentId, this.instanceId);
                messengerEngine.unregisterAll(this);
            };

            this.setTemporaryHead = function (set, xVelocity) {
                isTemporaryHead = set;
                this.transformation.setVelocity(xVelocity, this.transformation.velocity.y);
            };

            this.headSetTurnaround = function () {
                if (prevSegmentBehavior != null) {
                    prevSegmentBehavior.setTemporaryHead(true, this.transformation.velocity.x);
                }
                isTemporaryHead = false;
                this.setMovingVertical();

                if (isHead && !isTemporaryHead) {
                    this.setTurnaround({
                        x: this.transformation.position.x,
                        y: this.transformation.position.y
                    });
                }
            };

            this.setTurnaround = function (position) {
                turnaroundStarts.push({
                    x: position.x,
                    y: position.y
                });
                turnaroundEnds.push({
                    x: position.x,
                    y: position.y + segmentHeight
                });
                if (prevSegmentBehavior != null) {
                    prevSegmentBehavior.setTurnaround(position);
                }
            };

            var clearTurnaround = function (seg) {
                if (seg === segmentId && state != stateMovingVertical) {
                    turnaroundStarts = [];
                    if (prevSegment != null) {
                        messengerEngine.postImmediate("centipedeClearTurnaround", prevSegment);
                    }
                }
            };

            var centipedeSegmentCreated = function (segmentCreated, instanceId, behavior) {
                if (segmentId != null && segmentCreated === segmentId + 1) {
                    prevSegment = segmentCreated;
                    prevSegmentInstanceId = instanceId;
                    prevSegmentBehavior = behavior;
                    messengerEngine.unregister("centipedeSegmentCreated", centipedeSegmentCreated);
                }
            };

            this.centipedeSegmentDestroyed = function (segmentDestroyed) {
                if (segmentDestroyed === nextSegment) {
                    nextSegment = null;

                    isHead = true;
                    this.setAnimationState();

                    clearTurnaround(segmentId);
                } else if (segmentDestroyed === prevSegment) {
                    prevSegment = null;
                    prevSegmentInstanceId = null;
                    prevSegmentBehavior = null;
                }
            };

            this.centipedeSetPosition = function (position, xVelocity, s) {
                if (!isHead && !isTemporaryHead && state !== stateMovingVertical) {
                    this.transformation.setPosition(position.x, position.y);
                    if (xVelocity !== 0) {
                        state = stateMovingHorizontal;
                    }
                    this.setAnimationState(xVelocity);
                }
                if (prevSegmentBehavior != null && state !== stateMovingVertical) {
                    prevSegmentBehavior.centipedeSetPosition({
                        x: (this.isMovingLeft(xVelocity)) ? this.transformation.position.x + segmentWidth : this.transformation.position.x - segmentWidth,
                        y: this.transformation.position.y
                    }, xVelocity);
                }
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId === this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("jerkBackInPlace", this, this.jerkBackInPlace);
            messengerEngine.register("centipedeClearTurnaround", this, clearTurnaround);
            messengerEngine.register("centipedeSegmentCreated", this, centipedeSegmentCreated);
            messengerEngine.register("centipedeSegmentDestroyed", this, this.centipedeSegmentDestroyed);
            messengerEngine.register("centipedeSetPosition", this, this.centipedeSetPosition);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);

        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeSegment", BehaviorCentipedeSegment);
    }
}());