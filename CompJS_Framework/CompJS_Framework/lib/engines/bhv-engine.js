
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

    this.init = function () {
        return new Promise(function (resolve, reject) {
            servicesEngine.retrieveAllBhvComps().then(function (data) {
                buildBhvCompDefinitions(data);
                loadStateScripts();
                resolve();
            });
        });
    };

    this.update = function (delta) {
        for (var i = 0; i < bhvCompInstances.length; ++i) {
            bhvCompInstances[i].bhvComp.update(delta);
        }
    };

    var createBhvCompInstance = function (entity, bhvCompId) {
        var instance = {
            instanceId: entity.instanceId,
            bhvComp: new bhvConstructors[bhvCompDefinitions[bhvCompId].behaviorConstructor](entity)
        };
        bhvCompInstances.push(instance);
        messengerEngine.queueForPosting("createdBehaviorInstance", instance.bhvComp, instance.instanceId);
    };

    var setBehaviorConstructor = function (constructorName, constructorFunction) {
        if (bhvConstructors[constructorName] === undefined || bhvConstructors[constructorName] === null) {
            bhvConstructors[constructorName] = constructorFunction;
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
    messengerEngine.register("removeEntityInstance", this, removeBhvCompInstanceFromMessage);
};