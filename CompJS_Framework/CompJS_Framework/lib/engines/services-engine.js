
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
                    }
                    else {
                        reject(xmlHttp.status);
                    }
                }
            };

            if (parameters !== undefined) {
                xmlHttp.send(parameters);
            }
            else {
                xmlHttp.send();
            }
        });
    };

    this.retrieveAudioTypes = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/AudioTypes/");
    };

    this.retrievePhysTypes = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/PhysTypes/");
    };

    this.retrieveCollisionTypes = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/CollisionTypes/");
    };

    this.retrieveAllEntityDefinitions = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/EntityDefinitions/")
    };

    this.retrieveAllBhvComps = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/BhvComps/");
    };

    this.retrieveAllGfxComps = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/GfxComps/");
    };

    this.retrieveAllPhysComps = function () {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/PhysComps/");
    };

    this.loadLevel = function (levelId) {
        return sendHttpGetRequest("http://arcade/compjs/centipede/compjsservices/api/Levels/" + levelId);
    };
};

var globalServicesEngine = new ServicesEngine();