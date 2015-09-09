
var ComponentInstance = function () {
};

ComponentInstance.prototype.destroy = function () {
    if (globalMessengerEngine != null) {
        globalMessengerEngine.unregisterAll(this);
    }
};
