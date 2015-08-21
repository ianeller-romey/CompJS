
var BhvEngine = function (headElem) {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var bhvCompDefinitions = [];
    var bhvConstructors = {};
    var bhvCompInstances = [];

    var buildBhvCompDefinitions = function (data) {
        data.forEach(function(x){
            bhvCompDefinitions[x.id] = {
                stateFile: x.stateFile,
                behaviorConstructor: x.behaviorConstructor
            };
        });
    };

    var loadStateScripts = function() {
        bhvCompDefinitions.forEach(function(x){
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", x.stateFile);
            headElem.appendChild(script);
        });
    };

    this.init = function (gameId) {
        return new Promise(function (resolve, reject) {
            servicesEngine.retrieveAllBhvCompDefinitionsForGame(gameId).then(function (data) {
                buildBhvCompDefinitions(data);
                loadStateScripts();
                resolve();
            });
        });
    };

    this.update = function (delta) {
        for (var i = 0; i < bhvCompInstances.length; ++i) {
            bhvCompInstances[i].bhvComp.update(delta);
            bhvCompInstances[i].bhvComp.data = {};
        }
    };

    var createBhvCompInstance = function (entity, bhvCompId) {
        var bhvComp = new bhvConstructors[bhvCompDefinitions[bhvCompId].behaviorConstructor](entity);
        // if the behavior doesn't define its own data, do it for them
        if (bhvComp.data === undefined) {
            bhvComp.data = {};
        }
        var instance = {
            instanceId: entity.instanceId,
            bhvComp: bhvComp
        };
        bhvCompInstances.push(instance);
        messengerEngine.queueForPosting("createdBehaviorInstance", instance.bhvComp, instance.instanceId);
    };

    var setBehaviorConstructor = function (constructorName, constructorFunction) {
        if (bhvConstructors[constructorName] === undefined || bhvConstructors[constructorName] === null) {
            bhvConstructors[constructorName] = constructorFunction;
        }
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
    messengerEngine.register("setBehaviorConstructor", this, setBehaviorConstructor);
    messengerEngine.register("setBehaviorInstanceData", this, setBehaviorInstanceData);
    messengerEngine.register("removeEntityInstance", this, removeBhvCompInstanceFromMessage);
};