var CHEAT = globalMessengerEngine.queueForPosting;

(function () {
    "use strict";

    var init = function () {
        function suppressBackspace(event) { // we don't want the delete key to act like the browser back button
            event = event || window.event;
            var target = event.target || event.srcElement;
            if (event.keyCode == 8 && !/input|textarea/i.test(target.nodeName)) {
                updateConsoleInput(event);
                return false;
            }
        };
        document.onkeydown = suppressBackspace;
        document.onkeypress = suppressBackspace;

        var acceptInput = false;

        var cheatsElemHeight = "150px";
        var cheatsElem = document.createElement("div");
        cheatsElem.classList.add("transition150");
        cheatsElem.classList.add("center");
        cheatsElem.style.position = "relative"; 
        cheatsElem.style.top = 0;
        cheatsElem.style.height = "0px"; 
        cheatsElem.style.width = "640px";
        cheatsElem.style.background = "darkgray";
        cheatsElem.style.color = "black";
        cheatsElem.style["font-family"] = "Courier New";
        cheatsElem.style["overflow-y"] = "auto"
        cheatsElem.style.opacity = .75;
        document.body.appendChild(cheatsElem);

        var ConsoleInputManager = function () {
            var that = this;

            this.resetConsoleInput = function () {
                return this.addCharToConsoleInput("", "");
            };

            this.addCharToConsoleInput = function (add, str) {
                return str.substring(0, str.length - 1) + add + '_';
            };

            this.deleteCharFromConsoleInput = function (str) {
                return str.substring(0, str.length - 2) + '_';
            };

            this.setConsoleInput = function (setStr) {
                return setStr + '_';
            };
        };

        var deleteKey = 8;
        var enterKey = 13;
        var upKey = 38;
        var lastActiveCommand = "";
        var consoleInputManager = new ConsoleInputManager();
        cheatsElem.innerHTML = consoleInputManager.resetConsoleInput();
        function updateConsoleInput(event) {
            if (event.keyCode == deleteKey) { // delete characters if the delete key is pressed
                cheatsElem.innerHTML = consoleInputManager.deleteCharFromConsoleInput(cheatsElem.innerHTML);
            }
            else if (event.keyCode == enterKey) { // parse characters if the enter key is pressed
                var str = cheatsElem.innerHTML.substring(0, cheatsElem.innerHTML.length - 1);
                try {
                    eval(str);
                }
                catch (err) {
                    // TODO: notify error
                }
                lastActiveCommand = str;
                cheatsElem.innerHTML = consoleInputManager.resetConsoleInput();
            }
            else { // otherwise, add characters
                cheatsElem.innerHTML = consoleInputManager.addCharToConsoleInput(String.fromCharCode(event.keyCode), cheatsElem.innerHTML);
            }
        };
        window.addEventListener("keypress", function (event) {
            if (event.keyCode == 96) { // tilde
                if (cheatsElem.style.height != cheatsElemHeight) {
                    cheatsElem.style.height = cheatsElemHeight;
                    cheatsElem.style.padding = "8px";
                    acceptInput = true;
                    globalInputManager.disable();
                }
                else {
                    cheatsElem.style.height = 0;
                    cheatsElem.style.padding = "0px";
                    acceptInput = false;
                    globalInputManager.enable();
                }
            }
            else {
                if (acceptInput) {
                    updateConsoleInput(event);
                }
            }
        });
        window.addEventListener("keydown", function (event) {
            if (event.keyCode == upKey) {
                cheatsElem.innerHTML = consoleInputManager.setConsoleInput(lastActiveCommand);
            }
        });
    };

    window.addEventListener("load", function load(event) {
        window.removeEventListener("load", load, false);
        init();
    }, false);

}());