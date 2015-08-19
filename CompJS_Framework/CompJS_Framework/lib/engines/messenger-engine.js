
var MessengerEngine = function () {
    var messageTypes = [];
    var messageRegistration = {};
    var messages = [];

    var validMessageType = function (messageType) {
        return messageTypes.any(function (x) {
            return x == messageType;
        });
    }

    this.addMessageType = function (messageType) {
        if (!validMessageType(messageType)) {
            messageTypes.push(messageType);

            if (messageRegistration[messageType] === undefined) {
                messageRegistration[messageType] = [];
            }
        }
    };

    this.register = function (messageType, object, funct) {
        if (!validMessageType(messageType)) {
            messageTypes.push(messageType);
        }

        if (messageRegistration[messageType] === undefined) {
            messageRegistration[messageType] = [];
        }

        messageRegistration[messageType].push({
            caller: object,
            toCall: funct
        });
    };

    this.unregister = function (messageType, funct) {
        if (!validMessageType(messageType)) {
            throw "Cannot unregister from a messageType that does not exist.";
        }

        var messageTypeRegistration = messageRegistration[messageType];
        var messageRegisterer = messageTypeRegistration.firstOrNull(function (x) {
            return x.toCall === funct;
        });
        if (messageRegisterer != null) {
            var index = messageTypeRegistration.indexOf(messageRegisterer);
            if (index > -1) {
                messageTypeRegistration.splice(index, 1);
            }
        }
    };

    this.postImmediate = function (messageType) {
        if (!validMessageType(messageType)) {
            throw "Cannot post a message for a messageType that doesn't exist.";
        }

        var messageTypeRegistration = messageRegistration[messageType];
        var params = Array.prototype.slice.call(arguments, 1);
        messageTypeRegistration.forEach(function (x) {
            x.toCall.apply(x.caller, params);
        });
    };

    this.queueForPosting = function (messageType) {
        if (!validMessageType(messageType)) {
            throw "Cannot post a message for a messageType that doesn't exist.";
        }

        var params = Array.prototype.slice.call(arguments, 1);

        messages.push({
            messageType: messageType,
            data: params
        });
    };

    var post = function (message) {
        var messageTypeRegistration = messageRegistration[message.messageType];
        messageTypeRegistration.forEach(function (x) {
            x.toCall.apply(x.caller, message.data);
        });
    };

    this.update = function () {
        for (var i = 0; i < messages.length; ++i) {
            post(messages[i]);
        }
        messages = [];
    };
};

var globalMessengerEngine = new MessengerEngine();
globalMessengerEngine.addMessageType("createBehavior");
globalMessengerEngine.addMessageType("createdBehaviorInstance");
globalMessengerEngine.addMessageType("setBehaviorConstructor");

globalMessengerEngine.addMessageType("createGraphics");
globalMessengerEngine.addMessageType("setShaderProgram");
globalMessengerEngine.addMessageType("createdGraphicsInstance");
globalMessengerEngine.addMessageType("setInstanceAnimationState");

globalMessengerEngine.addMessageType("createPhysics");
globalMessengerEngine.addMessageType("createdPhysicsInstance");

globalMessengerEngine.addMessageType("createEntityInstance");
globalMessengerEngine.addMessageType("removeEntityInstance");