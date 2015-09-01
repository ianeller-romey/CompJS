﻿
var BhvEngine = function (headElem) {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var bhvCompDefinitions = [];
    var bhvConstructors = BhvEngine.bhvConstructors;
    var bhvCompInstances = [];

    var buildBhvCompDefinitions = function (data) {
        data.forEach(function(x){
            bhvCompDefinitions[x.id] = {
                stateFile: x.stateFile,
                behaviorConstructor: x.behaviorConstructor
            };
        });
    };

    this.init = function (gameId) {
        return new Promise(function (resolve, reject) {
            servicesEngine.retrieveAllBhvCompDefinitionsForGame(gameId).then(function (data) {
                buildBhvCompDefinitions(data);
                resolve();
            });
        });
    };

    this.update = function (delta) {
        for (var i = 0; i < bhvCompInstances.length; ++i) {
            bhvCompInstances[i].behavior.update(delta);
            bhvCompInstances[i].behavior.data = {};
        }
    };

    var createBhvCompInstance = function (entity, bhvCompId) {
        var behavior = new bhvConstructors[bhvCompDefinitions[bhvCompId].behaviorConstructor](entity);
        var instance = new BehaviorComponentInstance(entity, behavior);
        bhvCompInstances.push(instance);
        messengerEngine.queueForPosting("createdBehaviorInstance", instance.behavior, instance.instanceId);
    };

    var setBehaviorInstanceData = function (instanceId, data) {
        var instance = bhvCompInstances.firstOrNull(function (x) {
            return x.instanceId == instanceId;
        });
        if (instance != null) {
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    instance.bhvComp.data[key] = data[key];
                }
            }
        }
    };

    var getBhvCompInstanceForEntityInstance = function (instanceId) {
        var bhvCompInstance = bhvCompInstances.firstOrNull(function (x) {
            return x.instanceId == instanceId;
        });
        if (bhvCompInstance != null) {
            messengerEngine.queueForPosting("getBhvCompInstanceForEntityInstanceResponse", bhvCompInstance);
        }
    };

    var removeBhvCompInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < bhvCompInstances.length; ++i) {
            var instance = bhvCompInstances[i];
            if (instance.instanceId == instanceId) {
                bhvCompInstances.splice(i, 1);
                break;
            }
        }
    };

    messengerEngine.register("createBehavior", this, createBhvCompInstance);
    messengerEngine.register("setBehaviorInstanceData", this, setBehaviorInstanceData);
    messengerEngine.register("getBhvCompInstanceForEntityInstanceRequest", this, getBhvCompInstanceForEntityInstance);
    messengerEngine.register("removeEntityInstance", this, removeBhvCompInstanceFromMessage);
};

BhvEngine.setBehaviorConstructor = function (constructorName, constructorFunction) {
    var bhvConstructorList = BhvEngine.bhvConstructors;
    if (bhvConstructorList[constructorName] === undefined || bhvConstructorList[constructorName] === null) {
        bhvConstructorList[constructorName] = constructorFunction;
    }
};

globalMessengerEngine.register("setBehaviorConstructor", BhvEngine, BhvEngine.setBehaviorConstructor);

BhvEngine.loadStateScripts = function (data, headElem) {
    BhvEngine.bhvConstructors = {};
    BhvEngine.bhvScriptElements = [];

    var bhvScriptElementList = BhvEngine.bhvScriptElements;
    data.forEach(function (x) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", x.stateFile);
        headElem.appendChild(script);
        bhvScriptElementList.push(script);
    });

    var bhvConstructorList = BhvEngine.bhvConstructors;
    return new Promise(function (resolve, reject) {
        var checkScriptsLoaded = function () {
            var count = 0;
            for (var key in bhvConstructorList) {
                if (bhvConstructorList.hasOwnProperty(key)) {
                    count += 1;
                }
            }
            if (count == data.length) {
                resolve();
            } else {
                setTimeout(checkScriptsLoaded, 1);
            }
        };
        setTimeout(checkScriptsLoaded, 1);
    });
};

BhvEngine.unloadStateScripts = function () {
    return new Promise(function (resolve, reject) {
        BhvEngine.bhvScriptElements.forEach(function (e) {
            e.parentElement.removeChild(e);
        });
        BhvEngine.bhvScriptElements = [];
        BhvEngine.bhvConstructors = {};
        resolve();
    });
};