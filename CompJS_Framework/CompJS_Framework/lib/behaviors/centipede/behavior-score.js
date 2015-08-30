(function () {
    if (BehaviorScore === undefined) {
        var BehaviorScore = function (entity) {
            this.instanceId = entity.instanceId;

            var score = 0;
            var scoreElem = null;

            var messengerEngine = globalMessengerEngine;

            var init = function () {
                scoreElem = document.createElement("div");
                scoreElem.style.position = "absolute";
                scoreElem.style.top = 0;
                scoreElem.style.left = 0;
                scoreElem.style.height = "16px";
                scoreElem.style.background = "transparent";
                scoreElem.style.color = "red";
                scoreElem.style["font-weight"] = "bold";
                scoreElem.style["font-family"] = "Lucida Console";
                var parentElem = document.getElementById("game");
                parentElem.appendChild(scoreElem);
            };

            this.update = function () {
            };

            var incrementPlayerScore = function (scoreIncr) {
                score += scoreIncr;
                scoreElem.innerHTML = "SCORE: " + score;
            };

            init();
            incrementPlayerScore(0);

            messengerEngine.register("incrementPlayerScore", this, incrementPlayerScore);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorScore", BehaviorScore);
    }
}());