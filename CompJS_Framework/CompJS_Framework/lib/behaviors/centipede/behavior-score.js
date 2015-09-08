(function () {
    if (BehaviorScore === undefined) {
        var BehaviorScore = function (entity) {
            this.instanceId = entity.instanceId;
            this.scoreTextInstanceId = null;

            var score = 0;
            var scoreElem = null;

            var messengerEngine = globalMessengerEngine;

            var that = this;
            var init = function () {
                /*scoreElem = document.createElement("div");
                scoreElem.style.position = "absolute";
                scoreElem.style.top = 0;
                scoreElem.style.left = 0;
                scoreElem.style.height = "16px";
                scoreElem.style.background = "transparent";
                scoreElem.style.color = "red";
                scoreElem.style["font-weight"] = "bold";
                scoreElem.style["font-family"] = "Lucida Console";
                var parentElem = document.getElementById("game");
                parentElem.appendChild(scoreElem);*/
                messengerEngine.queueForPosting("createEntityInstance", "Text_LargeRedFont", {
                    position: {
                        x: 0,
                        y: 0
                    }}, function (x) {
                        that.scoreTextInstanceId = x;
                        incrementPlayerScore(0);
                });
            };

            this.update = function () {
            };

            var incrementPlayerScore = function (scoreIncr) {
                score += scoreIncr;
                messengerEngine.queueForPosting("setInstanceText", that.scoreTextInstanceId, "SCORE: " + score);
                /*scoreElem.innerHTML = "SCORE: " + score;*/
            };

            init();

            messengerEngine.register("incrementPlayerScore", this, incrementPlayerScore);
        };

        globalMessengerEngine.postImmediate("setBehaviorConstructor", "BehaviorScore", BehaviorScore);
    }
}());