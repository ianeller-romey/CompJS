
var BehaviorComponentInstance = function (entity, behavior) {
    this.instanceId = entity.instanceId;
    this.behavior = behavior;
    // if the behavior doesn't define its own data, do it for them
    if (this.behavior.data === undefined) {
        this.behavior.data = {};
    }
};

BehaviorComponentInstance.prototype = new ComponentInstance();

BehaviorComponentInstance.prototype.destroy = function () {
    if (globalMessengerEngine != null) {
        globalMessengerEngine.unregisterAll(this);
        if (this.behavior != null) {
            globalMessengerEngine.unregisterAll(this.behavior);
        }
    }
};
