
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

    var pressedArrayTemp = {};
    var triggeredArrayTemp = {};

    var pressedArray = {};
    var triggeredArray = {};

    var triggeredArrayAccepting = {};

    var updateFunction;

    var keydownEvent = function (event) {
        pressedArrayTemp[event.keyCode] = true;
        if (triggeredArrayAccepting[event.keyCode] === undefined || triggeredArrayAccepting[event.keyCode] === true) {
            triggeredArrayTemp[event.keyCode] = true;
            triggeredArrayAccepting[event.keyCode] = false;
        }
    };
   
    var keyupEvent = function (event) {
        pressedArrayTemp[event.keyCode] = false;
        triggeredArrayTemp[event.keyCode] = false;
        triggeredArrayAccepting[event.keyCode] = true;
    };

    this.isPressed = function (keyCode) {
        return pressedArray[keyCode] !== undefined && pressedArray[keyCode];
    };

    this.isTriggered = function (keyCode) {
        return triggeredArray[keyCode] !== undefined && triggeredArray[keyCode];
    };

    this.isAnyPressed = function () {
        for (var keyCode in pressedArray) {
            if (pressedArray.hasOwnProperty(keyCode) && pressedArray[keyCode] === true) {
                return true;
            }
        }
        return false;
    };

    this.isAnyTriggered = function () {
        for (var keyCode in triggeredArray) {
            if (triggeredArray.hasOwnProperty(keyCode) && triggeredArray[keyCode] === true) {
                return true;
            }
        }
        return false;
    };

    this.isAnyPressedOrTriggered = function () {
        return this.isAnyPressed() || this.isAnyTriggered();
    };

    this.init = function () {
        return new Promise(function (resolve, reject) {
            window.addEventListener("keydown", keydownEvent);
            window.addEventListener("keyup", keyupEvent);
            resolve();
        });
    };

    this.shutdown = function () {
        return new Promise(function (resolve, reject) {
            window.removeEventListener("keydown", keydownEvent);
            window.removeEventListener("keyup", keyupEvent);
            resolve();
        });
    }

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