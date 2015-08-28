(function () {
    if (BehaviorMushroomManager === undefined) {
        var BehaviorMushroomManager = function (entity) {
            this.instanceId = entity.instanceId;

            var messengerEngine = globalMessengerEngine;

            var inspectingDamagedMushrooms = false;
            var damagedMushrooms = [];
            var updateInterval = 300;
            var currentInterval = 0;

            this.update = function (delta) {
                if (inspectingDamagedMushrooms) {
                    if (damagedMushrooms.length > 0) {
                        currentInterval != delta;
                        if (currentInterval >= updateInterval) {
                            currentInterval = 0;

                            var mushroomInstanceId = damagedMushrooms.shift();
                            messengerEngine.queueForPosting("setBehaviorInstanceData", mushroomInstanceId, {
                                reset: true
                            });
                        }
                    } else {
                        messengerEngine.queueForPosting("halftime", false);
                    }
                }
            };

            var createMushrooms = function () {
                var numColumns = 32;
                var numRows = 32;
                var viewportWidth = 512;
                var viewportHeight = viewportWidth;
                var mushroomWidth = 16;
                var mushroomHeight = 16;
                var columnStartPoint = 0 + (mushroomWidth / 2);
                var columnEndPoint = viewportWidth - (mushroomWidth / 2);
                var rowStartPoint = mushroomHeight + (mushroomHeight / 2);
                var rowEndPoint = viewportHeight - (mushroomHeight / 2);

                var numMushrooms = 50;
                var currentNumMushrooms = 0;
                var randChance = numMushrooms;
                for (var y = rowStartPoint; y < rowEndPoint; y += mushroomHeight) {
                    for (var x = columnStartPoint; x < columnEndPoint; x += mushroomWidth) {
                        if ((Math.random() * 100) < randChance) {
                            messengerEngine.queueForPosting("createEntityInstance", "Mushroom", {
                                position: {
                                    x: x,
                                    y: y
                                }
                            });
                            randChance -= 1;
                            if (++currentNumMushrooms >= numMushrooms) {
                                return;
                            }
                        }
                    }
                }
            };

            var halftime = function (start) {
                if(start){
                    inspectingDamagedMushrooms = true;
                    messengerEngine.queueForPosting("getAllDamagedMushroomsRequest", true);
                } else {
                    inspectingDamagedMushrooms = false;
                }
            };

            var getAllDamagedMushrooms = function (instanceId) {
                damagedMushrooms.push(instanceId);
            };

            messengerEngine.register("halftime", this, halftime);
            messengerEngine.register("getAllDamagedMushroomsResponse", this, getAllDamagedMushrooms);

            createMushrooms();
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroomManager", BehaviorMushroomManager);
    }
}());