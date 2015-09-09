(function () {
    "use strict";

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);
        initialize();

        function suppressBackspace(event) { // we don't want the delete key to act like the browser back button
            event = event || window.event;
            var target = event.target || event.srcElement;
            if (event.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
                return false;
            }
        };
        document.onkeydown = suppressBackspace;
        document.onkeypress = suppressBackspace;
    }, false);

    var initialize = function () {
        var Cabinet = function (menuElem, gameElem) {
            var menuElement = menuElem;
            var gameElement = gameElem;
            var servicesEngine = globalServicesEngine;

            var gamesDefinitions = [];

            this.init = function () {
                servicesEngine.retrieveAllGames().then(function (data) {
                    buildGamesDefinitions(data);
                    displayMenu();
                });
            };

            var buildGamesDefinitions = function(data) {
                data.forEach(function (g) {
                    gamesDefinitions[g.id] = g.name;
                });
            };

            var createOnMenuSelect = function (id) {
                return function () {
                    displayGame();
                    loadGame(id);
                };
            };

            var createOnMenuMouseEvents = function (selectionElement, g) {
                var go;
                var blink1 = function (selectionElement, g) {
                    selectionElement.innerHTML = ">" + g;
                    if (go) {
                        setTimeout(blink2, 500, selectionElement, g);
                    }
                };
                var blink2 = function (selectionElement, g) {
                    if (go) {
                        selectionElement.innerHTML = ">" + g + "_";
                        setTimeout(blink1, 500, selectionElement, g);
                    }
                };
                return {
                    enter: function () {
                        go = true;
                        blink2(selectionElement, g);
                    },
                    leave: function () {
                        go = false;
                        blink1(selectionElement, g);
                    }
                };
            };

            var displayMenu = function () {
                gameElement.style.display = "none";
                menuElement.style.display = "";

                var menuViewElem = document.getElementById("menuView");
                gamesDefinitions.forEach(function (g, i) {
                    var selectionElem = document.createElement("span");
                    selectionElem.classList.add("menuSelected");
                    selectionElem.classList.add("transition150");
                    selectionElem.style["margin-top"] = "32px";
                    selectionElem.style.display = "inline-block";
                    var onSelect = createOnMenuSelect(i);
                    var onMouse = createOnMenuMouseEvents(selectionElem, g);
                    selectionElem.addEventListener("click", function () {
                        onSelect();
                    });
                    selectionElem.addEventListener("mouseenter", function () {
                        onMouse.enter();
                    });
                    selectionElem.addEventListener("mouseleave", function () {
                        onMouse.leave();
                    });
                    selectionElem.innerHTML = ">" + g;

                    menuViewElem.appendChild(selectionElem);
                });
            };

            var displayGame = function () {
                gameElement.style.display = "";
                menuElement.style.display = "none";
                var menuViewElem = document.getElementById("menuView");
                menuViewElem.innerHTML = "";
            };

            var loadGame = function (gameId) {
                var headElem = document.getElementsByTagName("head")[0];
                var canvasElem = document.getElementById("glCanvas");
                // statically load behaviors
                var loadScriptsPromise = new Promise(function (resolve, reject) {
                    servicesEngine.retrieveAllBhvCompDefinitionsForGame(gameId).then(function (data) {
                        BhvEngine.loadStateScripts(data, headElem).then(function () {
                            resolve();
                        });
                    });
                });
                // statically load shaders
                var loadShadersPromise = new Promise(function (resolve, reject) {
                    servicesEngine.retrieveAllShadersForGame(gameId).then(function (data) {
                        GfxEngine.loadShaderScripts(data, headElem).then(function(){
                            resolve();
                        });
                    });
                });
                Promise.all([loadScriptsPromise, loadShadersPromise]).then(function () {
                    var messengerEngine = globalMessengerEngine;
                    var audEngine;
                    var bhvEngine;
                    var gfxEngine;
                    var physEngine;
                    var entManager;
                    var inputManager;
                    var run = function () {
                        audEngine = new AudEngine();
                        bhvEngine = new BhvEngine(headElem);
                        gfxEngine = new GfxEngine(canvasElem);
                        entManager = new EntityManager(gameId);
                        physEngine = new PhysEngine();
                        inputManager = globalInputManager;
                        var initPromise = Promise.all([audEngine.init(gameId), bhvEngine.init(gameId), gfxEngine.init(gameId), entManager.init(gameId), physEngine.init(gameId), inputManager.init()]);
                        initPromise.then(function () {
                            servicesEngine.retrieveAllLevelsForGame(gameId).then(function (data) {
                                entManager.loadLevel(gameId, data[0].id);

                                var d = new Date();
                                var n = d.getTime();
                                var gameLoop = function () {
                                    d = new Date();
                                    var newN = d.getTime();
                                    var delta = (newN - n);
                                    n = newN;
                                    inputManager.update(delta);
                                    messengerEngine.update(delta);
                                    audEngine.update(delta);
                                    gfxEngine.update(delta);
                                    bhvEngine.update(delta);
                                    physEngine.update(delta);

                                    if (inputManager.isTriggered(inputManager.keys.escape)) {
                                        var shutdownPromise = Promise.all([audEngine.shutdown(gameId), bhvEngine.shutdown(gameId), gfxEngine.shutdown(gameId), entManager.shutdown(gameId), physEngine.shutdown(gameId), inputManager.shutdown()]);
                                        shutdownPromise.then(function () {
                                            Promise.all([BhvEngine.unloadStateScripts(), GfxEngine.unloadShaderScripts()]).then(function () {
                                                setTimeout(displayMenu, 1);
                                            });
                                        });
                                    } else {
                                        setTimeout(gameLoop, 1);
                                    }
                                };
                                gameLoop();
                            });
                        });
                    };
                    run();
                });
            };
        };

        var MENU = document.getElementById("menu");
        var GAME = document.getElementById("game");
        if (MENU && GAME) {
            var driver = new Cabinet(MENU, GAME);
            driver.init();
        }
    };
}());