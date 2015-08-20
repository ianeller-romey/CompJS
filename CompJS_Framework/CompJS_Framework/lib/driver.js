(function () {
    "use strict";

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);
        initialize();
    }, false);

    var initialize = function () {
        var Cabinet = function (cabinetElem, viewportElem) {
            var servicesEngine = globalServicesEngine;

            var gamesDefinitions = [];

            this.init = function () {
                servicesEngine.retrieveAllGames().then(function (data) {
                    buildGamesDefinitions(data);
                    displayCabinet();
                });
            };

            var buildGamesDefinitions = function(data) {
                data.forEach(function (g) {
                    gamesDefinitions[g.id] = g.name;
                });
            };

            var displayCabinet = function () {
                viewportElem.style.display = "none";
                cabinetElem.style.display = "";

                gamesDefinitions.forEach(function (g, i) {
                    var gameElem = document.createElement("span");
                    gameElem.classList.add("cabinetSelected");
                    var onSelect = createOnCabinetSelect(i);
                    gameElem.addEventListener("click", function () {
                        onSelect();
                    });
                    gameElem.innerHTML = g;

                    cabinetElem.appendChild(gameElem);
                });
            };

            var createOnCabinetSelect = function (id) {
                return function () {
                    displayViewport();
                    loadGame(id);
                };
            };

            var displayViewport = function () {
                viewportElem.style.display = "";
                cabinetElem.style.display = "none";
                cabinetElem.innerHTML = "";
            };

            var loadGame = function (gameId) {
                var headElem = document.getElementsByTagName("head")[0];
                var canvasElem = document.getElementById("glCanvas");
                servicesEngine.retrieveAllShadersForGame(gameId).then(function (data) {
                    GfxEngine.loadShaderScripts(data, headElem).then(function () {

                        var messengerEngine = globalMessengerEngine;
                        var bhvEngine;
                        var gfxEngine;
                        var physEngine;
                        var entManager;
                        var inputManager;
                        var run = function () {
                            bhvEngine = new BhvEngine(headElem);
                            gfxEngine = new GfxEngine(canvasElem);
                            entManager = new EntityManager();
                            physEngine = new PhysEngine();
                            inputManager = globalInputManager;
                            var initPromise = Promise.all([bhvEngine.init(gameId), gfxEngine.init(gameId), entManager.init(gameId), physEngine.init(gameId), inputManager.init()]);
                            initPromise.then(function () {
                                servicesEngine.retrieveAllLevelsForGame(gameId).then(function (data) {
                                    entManager.loadLevel(data[0].id);

                                    var d = new Date();
                                    var n = d.getTime();
                                    var go = true;
                                    var gameLoop = function () {
                                        d = new Date();
                                        var newN = d.getTime();
                                        var delta = (newN - n) / 1000;
                                        n = newN;
                                        inputManager.update(delta);
                                        messengerEngine.update(delta);
                                        gfxEngine.update(delta);
                                        bhvEngine.update(delta);
                                        physEngine.update(delta);

                                        if (go) {
                                            setTimeout(gameLoop, 1);
                                        }
                                        else {
                                            // TODO: Destroy webGL, etc.
                                            setTimeout(displayCabinet, 1);
                                        }
                                    };
                                    gameLoop();
                                });
                            });
                        };
                        run();
                    });
                });
            };
        };

        var c = document.getElementById("cabinet");
        var v = document.getElementById("viewport");
        if (c && v) {
            var driver = new Cabinet(c, v);
            driver.init();
        }
    };
}());