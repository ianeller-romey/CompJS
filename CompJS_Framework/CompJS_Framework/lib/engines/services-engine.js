
var ServicesEngine = function () {

    var sendHttpGetRequest = function (url, parameters) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.url = url;
        xmlHttp.open("GET", url, true);
        xmlHttp.setRequestHeader("Content-type", "text/plain");

        return new Promise(function (resolve, reject) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlHttp.status == 200) {
                        var data = JSON.parse(xmlHttp.responseText);
                        resolve(data);
                    } else {
                        reject(xmlHttp.status);
                    }
                }
            };

            if (parameters !== undefined) {
                xmlHttp.send(parameters);
            } else {
                xmlHttp.send();
            }
        });
    };

    this.retrieveAudioTypes = function () {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/compjs/AudioTypes/");
    };

    this.retrievePhysTypes = function () {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/compjs/PhysTypes/");
    };

    this.retrieveCollisionTypes = function () {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/compjs/CollisionTypes/");
    };

    this.retrieveAllGames = function () {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/");
    };

    this.retrieveAllLevelsForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/levels");
    };

    this.retrieveAllEntityTypeDefinitionsForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/ent/")
    };

    this.retrieveAllBhvCompDefinitionsForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/bhv/");
    };

    this.retrieveAllGfxCompDefinitionsForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/gfx/");
    };

    this.retrieveAllShadersForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/shaders/");
    };

    this.retrieveAllPhysCompDefinitionsForGame = function (gameId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/phys/");
    };

    this.loadLevel = function (gameId, levelId) {
        return sendHttpGetRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/levels/" + levelId);
    };
};

var globalServicesEngine = new ServicesEngine();