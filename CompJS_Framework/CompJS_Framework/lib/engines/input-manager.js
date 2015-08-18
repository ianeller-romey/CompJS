
var InputManager = function () {
    var messengerEngine = globalMessengerEngine;

    var arrowLeft = 37;
    var arrowUp = 38;
    var arrowRight = 39;
    var arrowDown = 40;

    var arrowLeftPressed = false;
    var arrowUpPressed = false;
    var arrowRightPressed = false;
    var arrowDownPressed = false;

    var arrowLeftTriggered = false;
    var arrowUpTriggered = false;
    var arrowRightTriggered = false;
    var arrowDownTriggered = false;

    var pressedArray = [];
    var triggeredArray = [];

    this.isArrowLeftPressed = function () {
        return pressedArray[arrowLeft];
    };

    this.isArrowUpPressed = function () {
        return pressedArray[arrowUp];
    };

    this.isArrowRightPressed = function () {
        return pressedArray[arrowRight];
    };

    this.isArrowDownPressed = function () {
        return pressedArray[arrowDown];
    };

    this.isArrowLeftTriggered = function () {
        return triggeredArray[arrowLeft];
    };

    this.isArrowUpTriggered = function () {
        return triggeredArray[arrowUp];
    };

    this.isArrowRightTriggered = function () {
        return triggeredArray[arrowRight];
    };

    this.isArrowDownTriggered = function () {
        return triggeredArray[arrowDown];
    };

    this.init = function () {
        return new Promise(function (resolve, reject) {
            pressedArray[arrowLeft] = false;
            pressedArray[arrowUp] = false;
            pressedArray[arrowRight] = false;
            pressedArray[arrowDown] = false;

            triggeredArray[arrowLeft] = false;
            triggeredArray[arrowUp] = false;
            triggeredArray[arrowRight] = false;
            triggeredArray[arrowDown] = false;

            window.addEventListener("keydown", function (event) {
                if (event.keyCode == arrowLeft) {
                    arrowLeftPressed = true;
                    arrowLeftTriggered = true;
                }
                else if (event.keyCode == arrowUp) {
                    arrowUpPressed = true;
                    arrowUpTriggered = true;
                }
                else if (event.keyCode == arrowRight) {
                    arrowRightPressed = true;
                    arrowRightTriggered = true;
                }
                else if (event.keyCode == arrowDown) {
                    arrowDownPressed = true;
                    arrowDownTriggered = true;
                }
            });
            window.addEventListener("keyup", function (event) {
                if (event.keyCode == arrowLeft) {
                    arrowLeftPressed = false;
                    arrowLeftTriggered = false;
                }
                else if (event.keyCode == arrowUp) {
                    arrowUpPressed = false;
                    arrowUpTriggered = false;
                }
                else if (event.keyCode == arrowRight) {
                    arrowRightPressed = false;
                    arrowRightTriggered = false;
                }
                else if (event.keyCode == arrowDown) {
                    arrowDownPressed = false;
                    arrowDownTriggered = false;
                }
            });
            resolve();
        });
    };

    this.update = function () {
        pressedArray[arrowLeft] = arrowLeftPressed;
        pressedArray[arrowUp] = arrowUpPressed;
        pressedArray[arrowRight] = arrowRightPressed;
        pressedArray[arrowDown] = arrowDownPressed;

        if (arrowLeftTriggered === true && triggeredArray[arrowLeft] === false) {
            triggeredArray[arrowLeft] = true;
            arrowLeftTriggered = false;
        }
        else if (triggeredArray[arrowLeft] === true) {
            triggeredArray[arrowLeft] = false;
        }

        if (arrowUpTriggered === true && triggeredArray[arrowUp] === false) {
            triggeredArray[arrowUp] = true;
            arrowUpTriggered = false;
        }
        else if (triggeredArray[arrowUp] === true) {
            triggeredArray[arrowUp] = false;
        }

        if (arrowRightTriggered === true && triggeredArray[arrowRight] === false) {
            triggeredArray[arrowRight] = true;
            arrowRightTriggered = false;
        }
        else if (triggeredArray[arrowRight] === true) {
            triggeredArray[arrowRight] = false;
        }

        if (arrowDownTriggered === true && triggeredArray[arrowDown] === false) {
            triggeredArray[arrowDown] = true;
            arrowDownTriggered = false;
        }
        else if (triggeredArray[arrowDown] === true) {
            triggeredArray[arrowDown] = false;
        }
    };

};

var globalInputManager = new InputManager();