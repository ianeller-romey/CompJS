(function () {
    if (BehaviorMushroomManager === undefined) {
        var BehaviorMushroomManager = function (entity) {
            this.instanceId = entity.instanceId;

            var messengerEngine = globalMessengerEngine;

            this.update = function () {
            };

            var createMushrooms = function () {
                var numColumns = 18;
                var numRows = 18;
                var viewportWidth = 1024;
                var viewportHeight = 1024;
                var mushroomWidth = 52;
                var mushroomHeight = 52;
                var columnStartPoint = ((viewportWidth - (numColumns * mushroomWidth)) / 2) + (mushroomWidth / 2);
                var columnEndPoint = columnStartPoint + (numColumns * mushroomWidth);
                var rowStartPoint = ((viewportHeight - (numRows * mushroomHeight)) / 2) + (mushroomHeight / 2);
                var rowEndPoint = rowStartPoint + (numRows * mushroomHeight);

                var numMushrooms = 100;
                var currentNumMushrooms = 0;
                var randChance = (numMushrooms / (numColumns * numRows)) * 100.0;
                for (var y = rowStartPoint; y < rowEndPoint; y += mushroomHeight) {
                    for (var x = columnStartPoint; x < columnEndPoint; x += mushroomWidth) {
                        if ((Math.random() * 100) < randChance) {
                            messengerEngine.queueForPosting("createEntityInstance", "Mushroom", {
                                x: x,
                                y: y
                            });
                        }
                    }
                }
            };

            createMushrooms();
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorMushroomManager", BehaviorMushroomManager);
    }
}());