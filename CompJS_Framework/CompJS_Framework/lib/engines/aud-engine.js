
var AudEngine = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var audioDefinitions = {};

    var audioContext;

    var initAudioContext = function () {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        catch (e) {
        }

        if (!audioContext) {
            audioContext = null;
        }

        return (audioContext) ? true : false;
    };

    var buildAudioDefinitions = function (data) {
        var loadAudioPromises = [];
        for (var i = 0; i < data.length; ++i) {
            var audio = data[i];
            if (audioDefinitions[audio.name] === undefined) {
                var promise = new Promise(function (resolve, reject) {
                    servicesEngine.loadAudio(audio.audioFile).then(function (data) {
                        audioContext.decodeAudioData(data, function (buffer) {
                            audioDefinitions[audio.name] = {
                                audioTypeId: audio.audioTypeId,
                                buffer: buffer
                            };
                        });
                    });
                });
                loadAudioPromises.push(promise);
            }
        }
        return Promise.all(loadAudioPromises);
    };

    this.init = function (gameId) {
        var promise = new Promise(function (resolve, reject) {
            if (initAudioContext()) {
                servicesEngine.retrieveAllAudioForGame(gameId).then(function (data) {
                    buildAudioDefinitions(data).then(function () {
                        resolve();
                    });
                });
            } else {
                reject();
            }
        });
        return promise;
    };

    this.update = function (delta) {
    };

    var playAudio = function (audioName) {
        var audioDefinition = audioDefinitions[audioName];
        if (audioDefinition != null) {
            var source = audioContext.createBufferSource();
            source.buffer = audioDefinition.buffer;
            source.connect(audioContext.destination);
            source.start(0);
        }
    };
    
    messengerEngine.register("playAudio", this, playAudio);
};
