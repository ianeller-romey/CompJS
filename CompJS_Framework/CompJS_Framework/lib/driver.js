(function () {
    "use strict";

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);
        init();
    }, false);

    var messengerEngine = globalMessengerEngine;
    var bhvEngine;
    var gfxEngine;
    var physEngine;
    var entManager;
    var inputManager;
    function init() {
        var headElem = document.getElementsByTagName("head")[0];
        var canvasElem = document.getElementById("glCanvas");

        bhvEngine = new BhvEngine(headElem);
        gfxEngine = new GfxEngine(canvasElem);
        entManager = new EntityManager();
        physEngine = new PhysEngine();
        inputManager = globalInputManager;
        var initPromise = Promise.all([bhvEngine.init(), gfxEngine.init(), entManager.init(), physEngine.init(), inputManager.init()]);
        initPromise.then(function () {
            entManager.loadLevel(0);
            
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
            };
            gameLoop();
        });
    }
}());