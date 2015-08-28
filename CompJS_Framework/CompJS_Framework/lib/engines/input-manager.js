
var InputManager = function () {
    var messengerEngine = globalMessengerEngine;

    this.keys = {
        arrowLeft: 37,
        arrowUp: 38,
        arrowRight: 39,
        arrowDown: 40,
        w: 87,
        a: 65,
        s: 83,
        d: 68,
        space: 32,
        enter: 13,
        escape: 27
    };

    var pressedArrayTemp = [];
    var triggeredArrayTemp = [];

    var pressedArray = [];
    var triggeredArray = [];

    var updateFunction;

    this.isPressed = function (keyCode) {
        return pressedArray[keyCode] !== undefined && pressedArray[keyCode];
    };

    this.isTriggered = function (keyCode) {
        return triggeredArray[keyCode] !== undefined && triggeredArray[keyCode];
    };

    this.init = function () {
        return new Promise(function (resolve, reject) {
            window.addEventListener("keydown", function (event) {
                pressedArrayTemp[event.keyCode] = true;
                triggeredArrayTemp[event.keyCode] = true;
            });
            window.addEventListener("keyup", function (event) {
                pressedArrayTemp[event.keyCode] = false;
                triggeredArrayTemp[event.keyCode] = false;
            });
            resolve();
        });
    };

    var enabledUpdate = function () {
        var i;
        for (i in pressedArrayTemp) {
            pressedArray[i] = pressedArrayTemp[i];
        }

        for (i in triggeredArrayTemp) {
            if (triggeredArray[i] === undefined) {
                triggeredArray[i] = triggeredArrayTemp[i];
            } else if (triggeredArray[i] === false && triggeredArrayTemp[i] === true) {
                triggeredArray[i] = true;
                triggeredArrayTemp[i] = false;
            } else {
                triggeredArray[i] = false;
                triggeredArrayTemp[i] = false;
            }
        }
    };

    var disabledUpdate = function () {
        var i;
        for (i in pressedArrayTemp) {
            pressedArray[i] = false;
        }

        for (i in triggeredArrayTemp) {
                triggeredArray[i] = false;
        }
    };

    this.update = function () {
        updateFunction();
    };

    this.enable = function () {
        updateFunction = enabledUpdate;
    };

    this.disable = function () {
        updateFunction = disabledUpdate;
    };

    updateFunction = enabledUpdate;

};

var globalInputManager = new InputManager();