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

            var velocityAmountX = .2;
            var velocityAmountY = .2;

            var stateInitializing = 0;
            var stateMovingHorizontal = 1;
            var stateMovingVertical = 2;
            var statePoisoned = 3;
            var state = stateInitializing;
            var isHead = false;

            var turnaroundPositions = [];

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
                        position: {
                            x: this.transformation.position.x + segmentWidth,
                            y: this.transformation.position.y
                        },
                        data: {
                            nextSegment: segmentId,
                            segmentId: nextSegmentId,
                            totalSegments: totalSegments
                        }
                    });
                }

                messengerEngine.queueForPosting("centipedeSegmentCreated", segmentId, this.instanceId);
            };

            this.setAnimationState = function () {
                var animationState;
                if (isHead) {
                    animationState = (this.transformation.velocity.x > 0) ? 0 : 1;
                } else {
                    animationState = (this.transformation.velocity.x > 0) ? 2 : 3;
                }
                messengerEngine.queueForPosting("setInstanceAnimationState", this.instanceId, animationState);
            };

            this.setMovingHorizontal = function () {
                velocityAmountX = -velocityAmountX;
                this.transformation.velocity.x = velocityAmountX;
                this.transformation.velocity.y = 0.0;
                state = stateMovingHorizontal;

                this.setAnimationState();
            };

            this.setMovingVertical = function () {
                if ((this.transformation.position.y >= 488 && velocityAmountY > 0) ||
                    (this.transformation.position.y <= 8 && velocityAmountY < 0)) {
                    velocityAmountY = -velocityAmountY;
                }

                this.transformation.velocity.x = 0.0;
                this.transformation.velocity.y = velocityAmountY;
                state = stateMovingVertical;
            };

            this.update = function () {
                switch (state) {
                    case stateInitializing:
                        if (segmentId === null && this.data["segmentId"] !== undefined) {
                            this.init();
                            this.setMovingHorizontal();
                        }
                        break;

                    case stateMovingHorizontal:
                        if (isHead) {
                            if ((this.transformation.velocity.x < 0 && this.transformation.position.x <= 8) ||
                                (this.transformation.velocity.x > 0 && this.transformation.position.x >= 504)) {
                                this.setMovingVertical();

                                setTurnaround(segmentId, {
                                    x: this.transformation.position.x,
                                    y: this.transformation.position.y
                                });
                            }
                            for (var i = 0; i < this.physComp.colliders.length; ++i) {
                                var c = this.physComp.colliders[i];
                                if (c.entityTypeName === "Mushroom") {
                                    this.jerkBackX(c.position.x);

                                    this.setMovingVertical();

                                    setTurnaround(segmentId, {
                                        x: this.transformation.position.x,
                                        y: this.transformation.position.y
                                    });
                                }
                            }
                        } else {
                            if (turnaroundPositions.length > 0) {
                                var turnaroundPosition = turnaroundPositions[0];
                                if (this.transformation.position.y === turnaroundPosition.y) {
                                    if ((this.transformation.velocity.x > 0 && this.transformation.position.x >= turnaroundPosition.x) ||
                                        (this.transformation.velocity.x < 0 && this.transformation.position.x <= turnaroundPosition.x)) {
                                        this.transformation.position.x = turnaroundPosition.x;

                                        this.setMovingVertical();
                                    }
                                }
                            }
                        }
                        break;

                    case stateMovingVertical:
                        var turnaroundPosition = turnaroundPositions[0];

                        if (this.transformation.velocity.y > 0) {
                            var turnaroundFinalY = turnaroundPosition.y + segmentHeight;
                            if (this.transformation.position.y >= turnaroundFinalY) {
                                this.transformation.position.y = turnaroundFinalY;

                                this.setMovingHorizontal();

                                turnaroundPositions.shift();
                            }
                        } else {
                            var turnaroundFinalY = turnaroundPosition.y - segmentHeight;
                            if (this.transformation.position.y <= turnaroundFinalY) {
                                this.transformation.position.y = turnaroundFinalY;

                                this.setMovingHorizontal();

                                turnaroundPositions.shift();
                            }
                        }
                        break;
                }
                
                if (this.data["playerBulletDamage"] !== undefined || this.transformation.position.x > 712 || this.transformation.position.x < -200) {
                    this.playerBulletDamage();
                }
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("incrementPlayerScore", 10);
                messengerEngine.queueForPosting("centipedeSegmentDestroyed", segmentId, this.instanceId);
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);

                var mushroomOffsetX = (this.transformation.velocity.x > 0)
                    ? (this.transformation.position.x - (this.transformation.position.x % segmentWidth)) + segmentWidth
                    : this.transformation.position.x - (this.transformation.position.x % segmentWidth);
                var mushroomOffsetY = (this.transformation.velocity.y > 0)
                    ? (this.transformation.position.y - (this.transformation.position.y % segmentHeight)) + segmentHeight
                    : this.transformation.position.y - (this.transformation.position.y % segmentHeight);
                messengerEngine.queueForPosting("createEntityInstance", "MushroomWaiter", {
                    position: {
                        x: mushroomOffsetX + segmentHalfWidth,
                        y: mushroomOffsetY + segmentHalfHeight
                    }
                });

                messengerEngine.unregisterAll(this);
            };

            this.jerkBackX = function (x) {
                var jerkOffset = (this.transformation.velocity.x > 0) ? -1 : 1;
                jerkOffset = segmentWidth * jerkOffset;
                this.transformation.position.x = x + jerkOffset;
            };

            this.jerkBackY = function (y) {
                var jerkOffset = (this.transformation.velocity.y > 0) ? -1 : 1;
                jerkOffset = segmentWidth * jerkOffset;
                this.transformation.position.y = y + jerkOffset;
            };
            
            this.jerkBackInPlace = function (seg) {
                if (seg === segmentId) {
                    if (state === stateMovingHorizontal) {
                        if (this.transformation.velocity.x > 0) {
                            this.jerkBackX((this.transformation.position.x - (this.transformation.position.x % segmentWidth)) + segmentWidth);
                        } else {
                            this.jerkBackX((this.transformation.position.x - (this.transformation.position.x % segmentWidth)));
                        }
                    } else if (state === stateMovingVertical) {
                        if (this.transformation.velocity.y > 0) {
                            this.jerkBackY((this.transformation.position.y - (this.transformation.position.y % segmentHeight)) + segmentHeight);
                        } else {
                            this.jerkBackY((this.transformation.position.y - (this.transformation.position.y % segmentHeight)));
                        }
                    }
                    if (prevSegment != null) {
                        messengerEngine.queueForPosting("jerkBackInPlace", prevSegment);
                    }
                }
            };

            var setTurnaround = function (seg, position) {
                if (seg === segmentId) {
                    turnaroundPositions.push({
                        x: position.x,
                        y: position.y
                    });
                    if (prevSegment != null) {
                        messengerEngine.queueForPosting("centipedeSetTurnaround", prevSegment, position);
                    }
                }
            };

            var clearTurnaround = function (seg) {
                if (seg === segmentId && state != stateMovingVertical) {
                    turnaroundPositions = [];
                    if (prevSegment != null) {
                        messengerEngine.queueForPosting("centipedeClearTurnaround", prevSegment);
                    }
                }
            };

            var centipedeSegmentCreated = function (segmentCreated, instanceId) {
                if (segmentCreated === segmentId + 1) {
                    prevSegment = segmentCreated;
                }
            };

            this.centipedeSegmentDestroyed = function (segmentDestroyed) {
                if (segmentDestroyed === nextSegment) {
                    nextSegment = null;

                    isHead = true;
                    this.setAnimationState();

                    clearTurnaround(segmentId);
                    this.jerkBackInPlace(segmentId);
                } else if (segmentDestroyed === prevSegment) {
                    prevSegment = null;
                }
            };

            this.capturePhysicsInstance = function (physComp, instanceId) {
                if (instanceId === this.instanceId) {
                    this.physComp = physComp;
                    messengerEngine.unregister("createdPhysicsInstance", this.capturePhysicsInstance);
                }
            };

            messengerEngine.register("jerkBackInPlace", this, this.jerkBackInPlace);
            messengerEngine.register("centipedeSetTurnaround", this, setTurnaround);
            messengerEngine.register("centipedeClearTurnaround", this, clearTurnaround);
            messengerEngine.register("centipedeSegmentCreated", this, centipedeSegmentCreated);
            messengerEngine.register("centipedeSegmentDestroyed", this, this.centipedeSegmentDestroyed);
            messengerEngine.register("createdPhysicsInstance", this, this.capturePhysicsInstance);

        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorCentipedeSegment", BehaviorCentipedeSegment);
    }
}());