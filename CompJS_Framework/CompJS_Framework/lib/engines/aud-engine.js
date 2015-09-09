
var AudEngine = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var audioDefinitions = {};
    var audioSources = [];
    var numDesiredSources = 10;

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

    var buildAudioSoures = function () {
        var createSourceEndedEvent = function (i) {
            return function () {
                audioSources[i].available = true;
            };
        };

        return new Promise(function (resolve, reject) {
            for (var i = 0; i < numDesiredSources; ++i) {
                var source = audioContext.createBufferSource();
                source.connect(audioContext.destination);
                source.onended = createSourceEndedEvent(i);
                audioSources.push({
                    source: source,
                    available: true
                });
            }
        });
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

    this.shutdown = function (gameId) {
        return new Promise(function (resolve, reject) {
            audioDefinitions = {};
            while (audioSources.length > 0) {
                audioSources[0].stop(0);
                audioSources.shift();
            }
            audioContext.close();
            resolve();
        });
    };

    var getFirstAvailableSource = function () {
        return audioSources.firstOrNull(function (x) {
            return x.available;
        });
    };

    var playAudio = function (audioName) {
        var audioDefinition = audioDefinitions[audioName];
        if (audioDefinition != null) {
            var audioSource = getFirstAvailableSource();
            if (audioSource != null) {
                audioSource.available = false;
                audioSource.buffer = audioDefinition.buffer;
                audioSource.start(0);
            }
        }
    };
    
    messengerEngine.register("playAudio", this, playAudio);
};
