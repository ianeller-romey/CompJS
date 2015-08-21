
var GfxEngine = function (canvasElem) {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var textureDefinitions = {};
    var gfxCompDefinitions = [];
    var gfxCompInstances = [];

    var shaderList = GfxEngine.shaderList;

    var webGL;
    var webGLShaderProgram;
    var webGLVertexShaderExtraSteps;
    var webGLFragmentShaderExtraSteps;
    var webGLSquareVerticesBuffer;
    var webGLTexCoordBuffer;

    var horizAspect = 480.0 / 640.0;
    var vertices = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    var activeTexture = "";
    
    var initWebGL = function (canvas) {  
        try {
            webGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch(e) {
        }

        if (!webGL) {
            webGL = null;
        }

        return (webGL) ? true : false;
    };

    var initShaders = function () {
        for (var i = 0; i < shaderList.length; ++i) {
            shaderList[i].init(webGL, i);
        }
    };

    var initBuffers = function () {
        webGLSquareVerticesBuffer = webGL.createBuffer();
        webGLTexCoordBuffer = webGL.createBuffer();
    };

    var buildGfxCompDefinitions = function (data) {
        data.forEach(function (x) {
            gfxCompDefinitions[x.id] = {
                animationStateDefinitions: x.animationStateDefinitions
            };
        });
    };

    var buildTextureDefinitions = function (data) {
        var createWebGLTexture = function (image) {
            var webGLTexture = webGL.createTexture();
            webGL.bindTexture(webGL.TEXTURE_2D, webGLTexture);

            // Set the parameters so we can render any size image
            webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_S, webGL.CLAMP_TO_EDGE);
            webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_T, webGL.CLAMP_TO_EDGE);
            webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_MIN_FILTER, webGL.NEAREST);
            webGL.texParameteri(webGL.TEXTURE_2D, webGL.TEXTURE_MAG_FILTER, webGL.NEAREST);

            image.addEventListener("load", function () {
                webGL.texImage2D(webGL.TEXTURE_2D, 0, webGL.RGBA, webGL.RGBA, webGL.UNSIGNED_BYTE, image);
            });
            return webGLTexture;
        };

        var loadImagePromises = [];
        for (var i = 0; i < data.length; ++i) {
            for (var j = 0; j < data[i].animationStateDefinitions.length; ++j) {
                for (var k = 0; k < data[i].animationStateDefinitions[j].animationFrameDefinitions.length; ++k) {
                    var animationFrameDefinition = data[i].animationStateDefinitions[j].animationFrameDefinitions[k];
                    if (textureDefinitions[animationFrameDefinition.texture] === undefined) {
                        var image = new Image();
                        var webGLTexture = createWebGLTexture(image);
                        textureDefinitions[animationFrameDefinition.texture] = {
                            image: image,
                            webGLTexture: webGLTexture
                        };

                        var promise = new Promise(function (resolve, reject) {
                            image.addEventListener("load", function () {
                                resolve();
                            });
                        });
                        loadImagePromises.push(promise);

                        image.src = animationFrameDefinition.texture;
                    }
                }
            }
        }
        return Promise.all(loadImagePromises);
    };

    this.init = function (gameId) {
        var webGLPromise = new Promise(function (resolve, reject) {
            if (initWebGL(canvasElem)) {
                initShaders();
                initBuffers();

                setShaderProgram("Texture");

                webGL.clearColor(0.0, 0.0, 0.0, 0.0);
                webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
                webGL.enable(webGL.BLEND);
                webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);

                resolve();
            }
            else {
                reject("Failed to initialize WebGL.");
            }
        });
        var gfxCompsPromise = new Promise(function(resolve, reject){
            servicesEngine.retrieveAllGfxCompDefinitionsForGame(gameId).then(function (data) {
                var promises = Promise.all([buildGfxCompDefinitions(data), buildTextureDefinitions(data)]).then(function () {
                    resolve();
                });
            });
        });
        return Promise.all([webGLPromise, gfxCompsPromise]);
    };

    var fakeVectorMatrixMath2d = function (matrix2d, mathFunctionForX, mathFunctionForY) {
        var outMatrix2d = [];
        for (var i = 0; i < matrix2d.length; ++i) {
            var mathFunction = (i % 2) ? mathFunctionForY : mathFunctionForX;
            outMatrix2d.push(mathFunction(matrix2d[i]));
        }
        return outMatrix2d;
    };

    this.update = function (delta) {
        webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);

        if (gfxCompInstances.length === 0) {
            return;
        }

        var vertexVerts = [];
        var textureVerts = [];
        for (var i = 0; i < gfxCompInstances.length; ++i) {
            var g = gfxCompInstances[i];
            var gfxComp = g.gfxComp;
            var animationStateDefinition = gfxCompDefinitions[gfxComp.id].animationStateDefinitions[gfxComp.animationStateDefinition];
            var animationFrameDefinition = animationStateDefinition.animationFrameDefinitions[gfxComp.animationFrameDefinition];

            // animate
            gfxComp.currentDuration += delta;
            if (animationFrameDefinition.duration != null && gfxComp.currentDuration > animationFrameDefinition.duration) {
                gfxComp.animationFrameDefinition = (gfxComp.animationFrameDefinition + 1) % animationStateDefinition.animationFrameDefinitions.length;
                animationFrameDefinition = animationStateDefinition.animationFrameDefinitions[gfxComp.animationFrameDefinition];
                gfxComp.currentDuration = 0;
            }

            // vertex locations
            var scaledVerts = fakeVectorMatrixMath2d(vertices, function (x) {
                return x * animationFrameDefinition.width * g.transformation.scale.x;
            }, function (y) {
                return y * animationFrameDefinition.height * g.transformation.scale.y;
            });
            var translatedVerts = fakeVectorMatrixMath2d(scaledVerts, function (x) {
                return x + g.transformation.position.x;
            }, function (y) {
                return y + g.transformation.position.y;
            });
            translatedVerts.forEach(function (v) {
                vertexVerts.push(v);
            });

            // texture coords
            var top = animationFrameDefinition.texCoordTL;
            var rgt = animationFrameDefinition.texCoordTR;
            var bot = animationFrameDefinition.texCoordBR;
            var lft = animationFrameDefinition.texCoordBL;
            var texturePixelVerts = [lft, top,
                        lft + (rgt - lft), top,
                                      lft, top + (bot - top),
                                      lft, top + (bot - top),
                        lft + (rgt - lft), top,
                        lft + (rgt - lft), top + (bot - top)];
            texturePixelVerts.forEach(function (v) {
                textureVerts.push(v);
            });

            // same texture? don't draw yet
            var nextGfxComp = (i != gfxCompInstances.length - 1) ? gfxCompInstances[i + 1].gfxComp : null;
            var nextAnimationFrame = (nextGfxComp != null) ? gfxCompDefinitions[nextGfxComp.id].animationStateDefinitions[nextGfxComp.animationStateDefinition].animationFrameDefinitions[nextGfxComp.animationFrameDefinition] : null;
            if (nextAnimationFrame == null || animationFrameDefinition.texture != nextAnimationFrame.texture) {
                // vertex buffer
                webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLSquareVerticesBuffer);
                webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(vertexVerts), webGL.STATIC_DRAW);

                // vertex shader
                var positionLocation = webGL.getAttribLocation(webGLShaderProgram, "a_position")
                if (positionLocation != null) {
                    webGL.enableVertexAttribArray(positionLocation);
                    webGL.vertexAttribPointer(positionLocation, 2, webGL.FLOAT, false, 0, 0);
                }

                var resolutionLocation = webGL.getUniformLocation(webGLShaderProgram, "u_resolution");
                if (resolutionLocation != null) {
                    webGL.uniform2f(resolutionLocation, 1024, 1024);
                }

                if (webGLVertexShaderExtraSteps != null) {
                    webGLVertexShaderExtraSteps(webGL, webGLShaderProgram);
                }

                // texture buffer
                webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLTexCoordBuffer);
                webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(textureVerts), webGL.STATIC_DRAW);

                // texture shader
                var texCoordLocation = webGL.getAttribLocation(webGLShaderProgram, "a_texCoord");
                if (texCoordLocation != null) {
                    webGL.enableVertexAttribArray(texCoordLocation);
                    webGL.vertexAttribPointer(texCoordLocation, 2, webGL.FLOAT, false, 0, 0);
                }

                if (webGLFragmentShaderExtraSteps != null) {
                    webGLFragmentShaderExtraSteps(webGL, webGLShaderProgram);
                }

                // bind active texture
                if (animationFrameDefinition.texture != activeTexture) {
                    webGL.bindTexture(webGL.TEXTURE_2D, textureDefinitions[animationFrameDefinition.texture].webGLTexture);

                    activeTexture = animationFrameDefinition.texture;
                }

                // draw
                webGL.drawArrays(webGL.TRIANGLES, 0, vertexVerts.length / 2);

                vertexVerts = [];
                textureVerts = [];
            }
        }
    };

    var createGfxCompInstance = function (entity, gfxCompId) {
        var instance = {
            instanceId: entity.instanceId,
            transformation: entity.transformation,
            gfxComp: {
                id: gfxCompId,
                animationStateDefinition: 0,
                animationFrameDefinition: 0,
                currentDuration: 0
            }
        };
        // TODO: sort based on texture
        gfxCompInstances.push(instance);
        messengerEngine.queueForPosting("createdGraphicsInstance", instance.gfxComp, instance.instanceId);
    };

    var setInstanceAnimationState = function (instanceId, animationStateDefinition) {
        var gfxInstance = gfxCompInstances.firstOrNull(function (x) {
            return x.instanceId == instanceId;
        });
        if (gfxInstance != null) {
            gfxInstance.gfxComp.animationStateDefinition = animationStateDefinition;
        }
    };

    var removeGfxCompInstanceFromMessage = function (instanceId) {
        for (var i = 0; i < gfxCompInstances.length; ++i) {
            var instance = gfxCompInstances[i];
            if (instance.instanceId == instanceId) {
                gfxCompInstances.splice(i, 1);
                break;
            }
        }
    };

    var setShaderProgram = function (programName) {
        var shaderDefinition = shaderList.firstOrNull(function (x) {
            return x.name === programName;
        });
        if (shaderDefinition !== undefined && shaderDefinition !== null) {
            webGLShaderProgram = shaderDefinition.program;
            webGLVertexShaderExtraSteps = shaderDefinition.vertexShaderExtraSteps;
            webGLFragmentShaderExtraSteps = shaderDefinition.fragmentShaderExtraSteps;
            webGL.useProgram(webGLShaderProgram);
        }
    };

    messengerEngine.register("createGraphics", this, createGfxCompInstance);
    messengerEngine.register("setShaderProgram", this, setShaderProgram);
    messengerEngine.register("setInstanceAnimationState", this, setInstanceAnimationState);
    messengerEngine.register("removeEntityInstance", this, removeGfxCompInstanceFromMessage);
};

GfxEngine.shaderList = [];

GfxEngine.getShader = function (gl, id) {
    var shaderScript;
    var theSource;
    var currentChild;
    var shader;

    shaderScript = document.getElementById(id);

    if (!shaderScript) {
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while (currentChild) {
        if (currentChild.nodeType == currentChild.TEXT_NODE) {
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }

    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        // Unknown shader type
        return null;
    }

    gl.shaderSource(shader, theSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return null;
    }

    return shader;
};

GfxEngine.compileShader = function (gl, fragmentShaderId, vertexShaderId) {
    var fragmentShader = GfxEngine.getShader(gl, fragmentShaderId);
    var vertexShader = GfxEngine.getShader(gl, vertexShaderId);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        return null;
    }

    return shaderProgram;
};


GfxEngine.loadShaderScripts = function (data, headElem) {
    data.forEach(function (s) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", s.shaderFile);
        headElem.appendChild(script);
    });
    return new Promise(function (resolve, reject) {
        var checkShadersLoaded = function () {
            if (GfxEngine.shaderList.length == data.length) {
                resolve();
            }
            else {
                setTimeout(checkShadersLoaded, 1);
            }
        };
        setTimeout(checkShadersLoaded, 1);
    });
};