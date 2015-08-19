
var GfxEngine = function (canvasElem) {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var textureDefinitions = {};
    var gfxCompDefinitions = [];
    var gfxCompInstances = [];

    var webGL;
    var webGLShaderPrograms = [];
    var webGLShaderProgram;
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

    var getShader = function (id) {
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
            shader = webGL.createShader(webGL.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = webGL.createShader(webGL.VERTEX_SHADER);
        } else {
            // Unknown shader type
            return null;
        }

        webGL.shaderSource(shader, theSource);
        webGL.compileShader(shader);
        if (!webGL.getShaderParameter(shader, webGL.COMPILE_STATUS)) {
            return null;
        }

        return shader;
    };

    var initShaders = function () {
        var fragmentShader_texture = getShader("shader-fs-texture");
        var fragmentShader_edgeDetect = getShader("shader-fs-emboss");
        var vertexShader = getShader("shader-vs");
  
        var shaderProgram_texture = webGL.createProgram();
        webGLShaderPrograms["shader-fs-texture"] = shaderProgram_texture;
        webGL.attachShader(shaderProgram_texture, vertexShader);
        webGL.attachShader(shaderProgram_texture, fragmentShader_texture);
        webGL.linkProgram(shaderProgram_texture);
  
        if (!webGL.getProgramParameter(shaderProgram_texture, webGL.LINK_STATUS)) {
            return false;
        }

        var shaderProgram_edgeDetect = webGL.createProgram();
        webGLShaderPrograms["shader-fs-emboss"] = shaderProgram_edgeDetect;
        webGL.attachShader(shaderProgram_edgeDetect, vertexShader);
        webGL.attachShader(shaderProgram_edgeDetect, fragmentShader_edgeDetect);
        webGL.linkProgram(shaderProgram_edgeDetect);

        if (!webGL.getProgramParameter(shaderProgram_edgeDetect, webGL.LINK_STATUS)) {
            return false;
        }
  
        return true;
    };

    var initBuffers = function () {
        webGLSquareVerticesBuffer = webGL.createBuffer();
        webGLTexCoordBuffer = webGL.createBuffer();
    };

    var buildGfxCompDefinitions = function (data) {
        data.forEach(function (x) {
            gfxCompDefinitions[x.id] = {
                animationStates: x.animationStates
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
            for (var j = 0; j < data[i].animationStates.length; ++j) {
                for (var k = 0; k < data[i].animationStates[j].animationFrames.length; ++k) {
                    var animationFrame = data[i].animationStates[j].animationFrames[k];
                    if (textureDefinitions[animationFrame.texture] === undefined) {
                        var image = new Image();
                        var webGLTexture = createWebGLTexture(image);
                        textureDefinitions[animationFrame.texture] = {
                            image: image,
                            webGLTexture: webGLTexture
                        };

                        var promise = new Promise(function (resolve, reject) {
                            image.addEventListener("load", function () {
                                resolve();
                            });
                        });
                        loadImagePromises.push(promise);

                        image.src = animationFrame.texture;
                    }
                }
            }
        }
        return Promise.all(loadImagePromises);
    };

    this.init = function () {
        var webGLPromise = new Promise(function (resolve, reject) {
            if (initWebGL(canvasElem)) {
                initShaders();
                initBuffers();

                setShaderProgram("shader-fs-texture");

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
            servicesEngine.retrieveAllGfxComps().then(function (data) {
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
            var animationState = gfxCompDefinitions[gfxComp.id].animationStates[gfxComp.animationState];
            var animationFrame = animationState.animationFrames[gfxComp.animationFrame];

            // animate
            gfxComp.currentDuration += delta;
            if (animationFrame.duration != null && gfxComp.currentDuration > animationFrame.duration) {
                gfxComp.animationFrame = (gfxComp.animationFrame + 1) % animationState.animationFrames.length;
                animationFrame = animationState.animationFrames[gfxComp.animationFrame];
                gfxComp.currentDuration = 0;
            }

            // vertex locations
            var scaledVerts = fakeVectorMatrixMath2d(vertices, function (x) {
                return x * animationFrame.width * g.transformation.scale.x;
            }, function (y) {
                return y * animationFrame.height * g.transformation.scale.y;
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
            var top = animationFrame.texCoordTL;
            var rgt = animationFrame.texCoordTR;
            var bot = animationFrame.texCoordBR;
            var lft = animationFrame.texCoordBL;
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
            var nextAnimationFrame = (nextGfxComp != null) ? gfxCompDefinitions[nextGfxComp.id].animationStates[nextGfxComp.animationState].animationFrames[nextGfxComp.animationFrame] : null;
            if (nextAnimationFrame == null || animationFrame.texture != nextAnimationFrame.texture) {
                webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLSquareVerticesBuffer);
                webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(vertexVerts), webGL.STATIC_DRAW);

                var positionLocation = webGL.getAttribLocation(webGLShaderProgram, "a_position")
                webGL.enableVertexAttribArray(positionLocation);
                webGL.vertexAttribPointer(positionLocation, 2, webGL.FLOAT, false, 0, 0);

                var resolutionLocation = webGL.getUniformLocation(webGLShaderProgram, "u_resolution");
                webGL.uniform2f(resolutionLocation, 1024, 1024);

                webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLTexCoordBuffer);
                webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(textureVerts), webGL.STATIC_DRAW);

                var texCoordLocation = webGL.getAttribLocation(webGLShaderProgram, "a_texCoord");
                webGL.enableVertexAttribArray(texCoordLocation);
                webGL.vertexAttribPointer(texCoordLocation, 2, webGL.FLOAT, false, 0, 0);
                
                var textureSizeLocation = webGL.getUniformLocation(webGLShaderProgram, "u_textureSize");
                if (textureSizeLocation != null) {
                    var image = textureDefinitions[animationFrame.texture].image;
                    webGL.uniform2f(textureSizeLocation, image.width, image.height);
                }

                if (animationFrame.texture != activeTexture) {
                    webGL.bindTexture(webGL.TEXTURE_2D, textureDefinitions[animationFrame.texture].webGLTexture);

                    activeTexture = animationFrame.texture;
                }

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
                animationState: 0,
                animationFrame: 0,
                currentDuration: 0
            }
        };
        // TODO: sort based on texture
        gfxCompInstances.push(instance);
        messengerEngine.queueForPosting("createdGraphicsInstance", instance.gfxComp, instance.instanceId);
    };

    var setInstanceAnimationState = function (instanceId, animationState) {
        var gfxInstance = gfxCompInstances.firstOrNull(function (x) {
            return x.instanceId == instanceId;
        });
        if (gfxInstance != null) {
            gfxInstance.gfxComp.animationState = animationState;
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
        var shaderProgram = webGLShaderPrograms[programName];
        if (shaderProgram !== undefined && shaderProgram !== null) {
            webGL.useProgram(shaderProgram);
            webGLShaderProgram = shaderProgram;
        }
    };

    messengerEngine.register("createGraphics", this, createGfxCompInstance);
    messengerEngine.register("setShaderProgram", this, setShaderProgram);
    messengerEngine.register("setInstanceAnimationState", this, setInstanceAnimationState);
    messengerEngine.register("removeEntityInstance", this, removeGfxCompInstanceFromMessage);
};