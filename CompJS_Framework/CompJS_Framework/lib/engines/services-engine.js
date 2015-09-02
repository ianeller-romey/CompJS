
var ServicesEngine = function () {

    var sendHttpGetJSONRequest = function (url, parameters) {
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

    var sendHttpGetAudioRequest = function (url, parameters) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.url = url;
        xmlHttp.open("GET", url, true);
        xmlHttp.responseType = "arraybuffer";

        return new Promise(function (resolve, reject) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlHttp.status == 200) {
                        var data = xmlHttp.response;
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
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/compjs/AudioTypes/");
    };

    this.retrievePhysTypes = function () {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/compjs/PhysTypes/");
    };

    this.retrieveCollisionTypes = function () {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/compjs/CollisionTypes/");
    };

    this.retrieveAllGames = function () {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/");
    };

    this.retrieveAllLevelsForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/levels");
    };

    this.retrieveAllEntityTypeDefinitionsForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/ent/")
    };

    this.retrieveAllAudioForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/aud/");
    };

    this.retrieveAllBhvCompDefinitionsForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/bhv/");
    };

    this.retrieveAllGfxCompDefinitionsForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/gfx/");
    };

    this.retrieveAllShadersForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/shaders/");
    };

    this.retrieveAllPhysCompDefinitionsForGame = function (gameId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/phys/");
    };

    this.loadLevel = function (gameId, levelId) {
        return sendHttpGetJSONRequest("http://arcade/cabinet/compjs/compjsservices/game/" + gameId + "/levels/" + levelId);
    };

    this.loadAudio = function (url) {
        return sendHttpGetAudioRequest(url);
    };
};

var globalServicesEngine = new ServicesEngine();