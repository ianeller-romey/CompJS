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
            var positionDataArray = [];
            var positionDataArrayQueue = [];

            var prevSegmentInstanceId = null;
            var prevSegmentBehavior = null;

            var velocityAmountX = .2;
            var currentVelocityX = 0.0;
            var velocityAmountY = .2;
            var currentVelocityY = 0.0;

            var startingPosition = this.transformation.position.toXYObject();

            var stateInitializing = 0;
            var statePreparing = stateInitializing + 1;
            var stateMovingHorizontal = statePreparing + 1;
            var stateMovingVertical = stateMovingHorizontal + 1;
            var statePoisoned = stateMovingVertical + 1;
            var state = stateInitializing;
            var isHead = false;

            var turnaroundStarts = [];
            var turnaroundEnds = [];

            var segmentWidth = 16;
            var segmentHalfWidth = segmentWidth / 2;
            var segmentHeight = 16;
            var segmentHalfHeight = segmentHeight / 2;
            var segmentRow = segmentHeight;

            var messengerEngine = globalMessengerEngine;

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
                        position: new Vector2D(this.transformation.position.x, this.transformation.position.y),
                        data: {
                            nextSegment: segmentId,
                            segmentId: nextSegmentId,
                            totalSegments: totalSegments
                        }
                    });
                }

                messengerEngine.queueForPosting("centipedeSegmentCreated", segmentId, this.instanceId, this);
            };

            this.updateHead = function () {
                positionDataArrayQueue.push({
                    position: this.transformation.position.toXYObject(),
                    velocity: {
                        x: currentVelocityX,
                        y: currentVelocityY
                    },
                    state: state
                });

                if (positionDataArray.length > 0) {
                    this.centipedeSetPositionData();

                    if (positionDataArray.length === 0) {
                        this.transformation.setVelocity(currentVelocityX, currentVelocityY);
                    }

                    if (prevSegmentBehavior != null) {
                        prevSegmentBehavior.centipedeAddPositionData(positionDataArrayQueue[positionDataArrayQueue.length - 1]);
                        positionDataArrayQueue.shift();
                    }
                }
                else {
                    switch (state) {
                        case statePreparing:
                            if (this.transformation.position.distance(startingPosition) >= segmentWidth) {
                                if (prevSegmentBehavior != null) {
                                    positionDataArrayQueue.forEach(function (x) {
                                        prevSegmentBehavior.centipedeAddPositionData(x);
                                    });
                                }
                                state = stateMovingHorizontal;
                            }
                            break;

                        case stateMovingHorizontal:
                            if (prevSegmentBehavior != null) {
                                prevSegmentBehavior.centipedeAddPositionData(positionDataArrayQueue[positionDataArrayQueue.length - 1]);
                                positionDataArrayQueue.shift();
                            }

                            if ((this.isMovingLeft() && this.transformation.position.x <= 8) ||
                                (!this.isMovingLeft() && this.transformation.position.x >= 504)) {
                                this.headSetTurnaround();
                                break;
                            }
                            for (var i = 0; i < this.physComp.colliders.length; ++i) {
                                var c = this.physComp.colliders[i];
                                if (c.entityTypeName === "Mushroom") {
                                    this.headSetTurnaround();
                                    break;
                                }
                            }
                            break;

                        case stateMovingVertical:
                            if (prevSegmentBehavior != null) {
                                prevSegmentBehavior.centipedeAddPositionData(positionDataArrayQueue[positionDataArrayQueue.length - 1]);
                                positionDataArrayQueue.shift();
                            }

                            // hack so the game don't crash
                            if (turnaroundStarts.length === 0) {
                                this.playerBulletDamage();
                                break;
                            }

                            var turnaroundPosition = turnaroundStarts[0];
                            var turnaroundFinal = turnaroundEnds[0];

                            if (currentVelocityY > 0) {
                                if (this.transformation.position.y >= turnaroundFinal.y) {
                                    this.transformation.setPosition(this.transformation.position.x, turnaroundFinal.y);

                                    this.setMovingHorizontal();

                                    this.removeTurnaround();
                                }
                            } else {
                                if (this.transformation.position.y <= turnaroundFinal.y) {
                                    this.transformation.setPosition(this.transformation.position.x, turnaroundFinal.y);

                                    this.setMovingHorizontal();

                                    this.removeTurnaround();
                                }
                            }
                            break;
                    }
                }
            };

            this.updateElse = function () {
                if (positionDataArray.length > 0) {
                    positionDataArrayQueue.push({
                        position: this.transformation.position.toXYObject(),
                        velocity: {
                            x: currentVelocityX,
                            y: currentVelocityY
                        },
                        state: state
                    });

                    this.centipedeSetPositionData();
                    if (state === statePreparing) {
                        if (this.transformation.position.distance(startingPosition) >= segmentWidth) {
                            if (prevSegmentBehavior != null) {
                                positionDataArrayQueue.forEach(function (x) {
                                    prevSegmentBehavior.centipedeAddPositionData(x);
                                });
                            }
                        }
                    } else {
                        if (prevSegmentBehavior != null) {
                            prevSegmentBehavior.centipedeAddPositionData(positionDataArrayQueue[positionDataArrayQueue.length - 1]);
                            positionDataArrayQueue.shift();
                        }
                    }
                }
            };

            this.update = function () {
                if (state === stateInitializing) {
                    if (segmentId === null && this.data["segmentId"] !== undefined) {
                        this.init();
                        if (isHead) {
                            this.setMovingHorizontal();
                        }
                        state = statePreparing;
                    }
                } else {
                    if (this.data["playerBulletDamage"] !== undefined || this.transformation.position.x > (512 + segmentWidth) || this.transformation.position.x < -segmentWidth) {
                        this.playerBulletDamage();
                    } else {
                        if (isHead) {
                            this.updateHead();
                        } else {
                            this.updateElse();
                        }
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

                messengerEngine.postImmediate("centipedeSegmentDestroyed", segmentId, this.instanceId, turnaroundStarts, turnaroundEnds);
                messengerEngine.postImmediate("playAudio", "EnemyDeath");
            };

            this.isMovingLeft = function (xVelocity) {
                return (xVelocity != null) ? xVelocity < 0 : this.transformation.velocity.x < 0;
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
                currentVelocityX = velocityAmountX;
                currentVelocityY = 0.0;
                this.setAnimationState(velocityAmountX);
            };

            this.setMovingVertical = function () {
                if ((this.transformation.position.y >= 488 && velocityAmountY > 0) ||
                    (this.transformation.position.y <= 8 && velocityAmountY < 0)) {
                    velocityAmountY = -velocityAmountY;
                }
                this.transformation.setVelocity(0.0, velocityAmountY);

                state = stateMovingVertical;
                currentVelocityX = 0.0;
                currentVelocityY = velocityAmountY;
            };

            this.headSetTurnaround = function () {
                this.setMovingVertical();

                this.setTurnaround(this.transformation.position.toXYObject());
            };

            this.setTurnaround = function (position) {
                turnaroundStarts.push(position);
                turnaroundEnds.push({
                    x: position.x,
                    y: (currentVelocityY > 0) ? position.y + segmentHeight : position.y - segmentHeight
                });
            };

            this.removeTurnaround = function() {
                turnaroundStarts.shift();
                turnaroundEnds.shift();
            };

            this.centipedeSegmentCreated = function (segmentCreated, instanceId, behavior) {
                if (segmentId != null && segmentCreated === segmentId + 1) {
                    prevSegment = segmentCreated;
                    prevSegmentInstanceId = instanceId;
                    prevSegmentBehavior = behavior;
                    messengerEngine.unregister("centipedeSegmentCreated", this.centipedeSegmentCreated);
                }
            };

            this.centipedeSegmentDestroyed = function (segmentDestroyed, instanceDestroyed, ts, te) {
                if (segmentDestroyed === nextSegment) {
                    nextSegment = null;

                    isHead = true;

                    turnaroundStarts = [];
                    ts.forEach(function (x) {
                        turnaroundStarts.push(x);
                    });
                    turnaroundEnds = [];
                    te.forEach(function (x) {
                        turnaroundEnds.push(x);
                    });

                    this.setAnimationState(currentVelocityX);
                } else if (segmentDestroyed === prevSegment) {
                    prevSegment = null;
                    prevSegmentInstanceId = null;
                    prevSegmentBehavior = null;
                }
            };

            this.centipedeSetPositionData = function () {
                var positionData = positionDataArray[0];
                this.transformation.setPosition(positionData.position.x, positionData.position.y);
                currentVelocityX = positionData.velocity.x;
                currentVelocityY = positionData.velocity.y;
                state = positionData.state;

                this.setAnimationState(velocityAmountX);

                positionDataArray.shift();
            };

            this.centipedeAddPositionData = function (positionData) {
                positionDataArray.push(positionData);
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId === this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("centipedeClearTurnaround", this, this.clearTurnaround);
            messengerEngine.register("centipedeSegmentCreated", this, this.centipedeSegmentCreated);
            messengerEngine.register("centipedeSegmentDestroyed", this, this.centipedeSegmentDestroyed);
            messengerEngine.register("centipedeAddPositionData", this, this.centipedeAddPositionData);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);

        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeSegment", BehaviorCentipedeSegment);
    }
}());