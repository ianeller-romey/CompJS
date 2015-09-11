
var AudEngine = function () {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var audioTypeDefinitions = [];
    var audioDefinitions = {};
    var numDesiredSources = 20;

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

    var buildAudioTypeDefinitions = function (data) {
        data.forEach(function (x) {
            audioTypeDefinitions[x.id] = x.name;
        });
    };

    var buildAudioDefinitions = function (data) {
        // only decode one piece of audio at a time
        return new Promise(function (resolve, reject) {
            var loadAudioRecursively = function (index) {
                if (index >= data.length) {
                    resolve();
                } else {
                    var audio = data[index];
                    if (audioDefinitions[audio.name] === undefined) {
                        servicesEngine.loadAudio(audio.audioFile).then(function (data) {
                            audioContext.decodeAudioData(data, function (buffer) {
                                audioDefinitions[audio.name] = {
                                    audioTypeId: audio.audioTypeId,
                                    buffer: buffer
                                };
                                loadAudioRecursively(index + 1);
                            });
                        }, function (reason) {
                            var reasonPlus = "Failed to load audio files";
                            if (reason != null) {
                                reasonPlus = reasonPlus + "\r\n" + reason;
                            }
                            reject(reasonPlus);
                        });
                    } else {
                        loadAudioRecursively(index + 1);
                    }
                }
            }
            loadAudioRecursively(0);
        });
    };

    this.init = function (gameId) {
        if (initAudioContext()) {
            var audioTypePromise = new Promise(function (resolve, reject) {
                servicesEngine.retrieveAudioTypes().then(function (data) {
                    buildAudioTypeDefinitions(data);
                    resolve();
                }, function (reason) {
                    var reasonPlus = "Failed to load audio types";
                    if (reason != null) {
                        reasonPlus = reasonPlus + "\r\n" + reason;
                    }
                    reject(reasonPlus);
                });
            });
            var audioDefinitionPromise = new Promise(function(resolve, reject){
                servicesEngine.retrieveAllAudioForGame(gameId).then(function (data) {
                    buildAudioDefinitions(data).then(function(){
                        resolve();
                    }, function (reason) {
                        var reasonPlus = "Failed to build audio definitions";
                        if (reason != null) {
                            reasonPlus = reasonPlus + "\r\n" + reason;
                        }
                        reject(reasonPlus);
                    });
                }, function (reason) {
                    var reasonPlus = "Failed to load audio definitions";
                    if (reason != null) {
                        reasonPlus = reasonPlus + "\r\n" + reason;
                    }
                    reject(reasonPlus);
                });
            });
            return Promise.all([audioTypePromise, audioDefinitionPromise]);
        } else {
            return Promise.reject("Failed to initialize WebAudio API");
        }
    };

    this.update = function (delta) {
    };

    this.shutdown = function (gameId) {
        var that = this;
        return new Promise(function (resolve, reject) {
            audioDefinitions = {};
            audioContext.close();
            messengerEngine.unregisterAll(that);
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
            setTimeout(function(){
                var source = audioContext.createBufferSource();
                source.connect(audioContext.destination);
                source.buffer = audioDefinition.buffer;
                if(audioTypeDefinitions[audioDefinition.audioTypeId] === "Looped") {
                    source.loop = true;
                }
                source.start(0);
            }, 0);
        }
    };
    
    messengerEngine.register("playAudio", this, playAudio);
};
