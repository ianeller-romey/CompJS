(function () {
    if (BehaviorSpider === undefined) {
        var BehaviorSpider = function (entity) {
            this.instanceId = entity.instanceId;
            this.transformation = entity.transformation;
            this.durationSwitchDirection = 750;
            this.durationCurrent = this.durationSwitchDirection;
            this.velocityAmount = .35;

            var messengerEngine = globalMessengerEngine;

            this.update = function (delta) {
                if (this.data["playerBulletDamage"] !== undefined) {
                    this.playerBulletDamage();
                }
                else {
                    if (this.transformation.position.x >= 1000) {
                        this.switchDirectionX(-this.velocityAmount);
                        this.switchDirectionY();
                        this.durationCurrent = 0;
                    }
                    else if (this.transformation.position.x <= 24) {
                        this.switchDirectionX(this.velocityAmount);
                        this.switchDirectionY();
                        this.durationCurrent = 0;
                    }
                    if (this.transformation.position.y >= 1000) {
                        this.switchDirectionX();
                        this.switchDirectionY(-this.velocityAmount);
                        this.durationCurrent = 0;
                    }
                    else if (this.transformation.position.y <= 24) {
                        this.switchDirectionX();
                        this.switchDirectionY(this.velocityAmount);
                        this.durationCurrent = 0;
                    }
                    else {
                        this.durationCurrent += delta;
                        if (this.durationCurrent >= this.durationSwitchDirection) {
                            this.switchDirection();
                            this.durationCurrent = 0;
                        }
                    }
                }
            };

            this.switchDirectionX = function (x) {
                if (x === undefined) {
                    x = (Math.random() * 100 >= 50) ? this.velocityAmount : -this.velocityAmount;
                }
                this.transformation.velocity.x = x;
            }

            this.switchDirectionY = function (y) {
                if (y === undefined) {
                    y = (Math.random() * 100 >= 50) ? this.velocityAmount : -this.velocityAmount;
                }
                this.transformation.velocity.y = y;
            }

            this.switchDirection = function () {
                this.switchDirectionX();
                this.switchDirectionY();
            };

            this.playerBulletDamage = function () {
                messengerEngine.queueForPosting("removeEntityInstance", this.instanceId);
            };

            messengerEngine.register("playerBulletDamage", this, this.playerBulletDamage);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorSpider", BehaviorSpider);
    }
}());