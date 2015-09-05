﻿
var GfxEngine = function (canvasElem) {
    var servicesEngine = globalServicesEngine;
    var messengerEngine = globalMessengerEngine;

    var textureDefinitions = {};
    var gfx2DAnimationDefinitions = [];
    var gfx2DAnimationInstances = [];
    var gfxFontDefinitions = [];
    var gfxFontInstances = [];
    var renderPasses = [];
    var gfxCompTypeDefinitions = {};
    var gfxCompType2DAnimation = "2DAnimation";
    var gfxCompTypeFont = "Font";

    var shaderList = GfxEngine.shaderList;

    var webGL;
    var webGLShaderPrograms = [];
    var webGLVertexShaderExtraSteps = [];
    var webGLFragmentShaderExtraSteps = [];
    var webGLSquareVerticesBuffer;
    var webGLTexCoordBuffer;

    var width = 512;
    var height = width;
    var vertices = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0
    ];
    var activeTexture = "";

    var texture
    
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

    var buildGfx2DAnimationDefinitions = function (data) {
        data.forEach(function (x) {

            var renderPass = x.renderPass;
            if (!renderPasses.contains(renderPass)) {
                renderPasses.push(renderPass);
            }
            if (gfx2DAnimationInstances[renderPass] == null) {
                gfx2DAnimationInstances[renderPass] = [];
            }

            var animationStates = [];
            for (var i = 0; i < x.animationStateDefinitions.length; ++i) {
                var animationState = x.animationStateDefinitions[i];
                var animationFrames = [];
                for (var j = 0; j < animationState.animationFrameDefinitions.length; ++j) {
                    var animationFrame = animationState.animationFrameDefinitions[j];
                    animationFrames[animationFrame.frame] = {
                        id: animationFrame.id,
                        duration: animationFrame.duration,
                        texture: animationFrame.texture,
                        width: animationFrame.width,
                        height: animationFrame.height,
                        texCoordTL: animationFrame.texCoordTL,
                        texCoordTR: animationFrame.texCoordTR,
                        texCoordBR: animationFrame.texCoordBR,
                        texCoordBL: animationFrame.texCoordBL
                    };
                }
                animationStates[animationState.state] = {
                    id: animationState.id,
                    animationFrameDefinitions: animationFrames
                };
            }
            gfx2DAnimationDefinitions[x.id] = {
                animationStateDefinitions: animationStates,
                renderPass: renderPass
            };
            gfxCompTypeDefinitions[x.id] = gfxCompType2DAnimation;
        });
    };

    var buildGfxFontDefinitions = function (data) {
        data.forEach(function (x) {

            var renderPass = x.renderPass;
            if (!renderPasses.contains(renderPass)) {
                renderPasses.push(renderPass);
            }
            if (gfxFontInstances[renderPass] == null) {
                gfxFontInstances[renderPass] = [];
            }

            gfxFontDefinitions[x.id] = {
                fontTextureDefinition: {
                    id: x.fontTextureDefinition.id,
                    texture: x.fontTextureDefinition.texture,
                    textureWidth: x.fontTextureDefinition.textureWidth,
                    startT: x.fontTextureDefinition.startT,
                    startL: x.fontTextureDefinition.startL,
                    characterWidth: x.fontTextureDefinition.characterWidth,
                    characterHeight: x.fontTextureDefinition.characterHeight
                },
                renderPass: x.renderPass
            };
            gfxCompTypeDefinitions[x.id] = gfxCompTypeFont;
        });
    };

    var buildTextureDefinitions = function (data) {
        var createWebGLTexture = function (image) {
            var webGLTexture = webGL.createTexture();
            webGL.bindTexture(webGL.TEXTURE_2D, webGLTexture);

            // Set the parameters so we can render any size image
            webGL.texParameterf(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_S, webGL.CLAMP_TO_EDGE);
            webGL.texParameterf(webGL.TEXTURE_2D, webGL.TEXTURE_WRAP_T, webGL.CLAMP_TO_EDGE);
            webGL.texParameterf(webGL.TEXTURE_2D, webGL.TEXTURE_MIN_FILTER, webGL.NEAREST);
            webGL.texParameterf(webGL.TEXTURE_2D, webGL.TEXTURE_MAG_FILTER, webGL.NEAREST);

            image.addEventListener("load", function () {
                webGL.texImage2D(webGL.TEXTURE_2D, 0, webGL.RGBA, webGL.RGBA, webGL.UNSIGNED_BYTE, image);
            });
            return webGLTexture;
        };

        var loadImagePromises = [];
        for (var i = 0; i < data.length; ++i) {
            var texture = data[i];
            if (textureDefinitions[texture] === undefined) {
                var image = new Image();
                var webGLTexture = createWebGLTexture(image);
                textureDefinitions[texture] = {
                    image: image,
                    webGLTexture: webGLTexture
                };

                var promise = new Promise(function (resolve, reject) {
                    image.addEventListener("load", function () {
                        resolve();
                    });
                });
                loadImagePromises.push(promise);

                image.src = texture;
            }
        }
        return Promise.all(loadImagePromises);
    };

    this.init = function (gameId) {
        var webGLPromise = new Promise(function (resolve, reject) {
            canvasElem.width = width;
            canvasElem.height = height;
            if (initWebGL(canvasElem)) {
                initShaders();
                initBuffers();

                webGL.clearColor(0.0, 0.0, 0.0, 0.0);
                webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);
                webGL.enable(webGL.BLEND);
                webGL.blendFunc(webGL.SRC_ALPHA, webGL.ONE_MINUS_SRC_ALPHA);
                //webGL.viewport(0, 0, width, height);

                resolve();
            } else {
                reject("Failed to initialize WebGL.");
            }
        });
        var gfxCompsPromise = new Promise(function(resolve, reject){
            servicesEngine.retrieveAllGfxCompDefinitionsForGame(gameId).then(function (data) {
                // Initialize animations first ...
                var textures2DAnimation = data.gfx2DAnimations.select(function (x) {
                    return x.animationStateDefinitions.select(function (y) {
                        return y.animationFrameDefinitions.select(function (z) {
                            return z.texture;
                        }).distinct();
                    }).aggregate(function (a, b) {
                        return a.addRange(b);
                    });
                }).aggregate(function (a, b) {
                    return a.addRange(b);
                }).distinct();
                Promise.all([buildGfx2DAnimationDefinitions(data.gfx2DAnimations), buildTextureDefinitions(textures2DAnimation)]).then(function () {
                    // ... then fonts
                    var texturesFonts = data.gfxFonts.select(function (x) {
                        return x.fontTextureDefinition.texture;
                    }).distinct();
                    Promise.all([buildGfxFontDefinitions(data.gfxFonts), buildTextureDefinitions(texturesFonts)]).then(function () {

                        for (var i = 0; i < renderPasses.length; ++i) {
                            setShaderProgram("Texture", i);
                        }
                        resolve();
                    });
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

    var getAnimationStateDefinition = function (gfxCompId, animationState) {
        var asdf = gfx2DAnimationDefinitions[gfxCompId];
        if (asdf === undefined) {
            var asdfadfadfadfaf = 0;
        }
        return gfx2DAnimationDefinitions[gfxCompId].animationStateDefinitions[animationState];
    };

    var getAnimationStateDefinitionOfGfxComp = function (gfxComp) {
        return getAnimationStateDefinition(gfxComp.id, gfxComp.animationState);
    };

    var getAnimationFrameDefinition = function (gfxCompId, animationState, animationFrame) {
        return gfx2DAnimationDefinitions[gfxCompId].animationStateDefinitions[animationState].animationFrameDefinitions[animationFrame];
    };

    var getAnimationFrameDefinitionOfGfxComp = function (gfxComp) {
        return getAnimationFrameDefinition(gfxComp.id, gfxComp.animationState, gfxComp.animationFrame);
    };

    var draw = function (vertexVerts, textureVerts, webGLShaderProgram, webGLVertexShaderExtraStep, webGLFragmentShaderExtraStep, texture) {
        webGL.useProgram(webGLShaderProgram);

        // vertex buffer
        webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLSquareVerticesBuffer);
        webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(vertexVerts), webGL.STATIC_DRAW);

        // vertex shader
        var positionLocation = webGL.getAttribLocation(webGLShaderProgram, "a_position")
        if (positionLocation > -1) {
            webGL.enableVertexAttribArray(positionLocation);
            webGL.vertexAttribPointer(positionLocation, 2, webGL.FLOAT, false, 0, 0);
        }

        var resolutionLocation = webGL.getUniformLocation(webGLShaderProgram, "u_resolution");
        if (resolutionLocation != null) {
            webGL.uniform2f(resolutionLocation, width, height);
        }

        if (webGLVertexShaderExtraStep != null) {
            webGLVertexShaderExtraStep(webGL, webGLShaderProgram);
        }

        // texture buffer
        webGL.bindBuffer(webGL.ARRAY_BUFFER, webGLTexCoordBuffer);
        webGL.bufferData(webGL.ARRAY_BUFFER, new Float32Array(textureVerts), webGL.STATIC_DRAW);

        // texture shader
        var texCoordLocation = webGL.getAttribLocation(webGLShaderProgram, "a_texCoord");
        if (texCoordLocation > -1) {
            webGL.enableVertexAttribArray(texCoordLocation);
            webGL.vertexAttribPointer(texCoordLocation, 2, webGL.FLOAT, false, 0, 0);
        }

        if (webGLFragmentShaderExtraStep != null) {
            webGLFragmentShaderExtraStep(webGL, webGLShaderProgram);
        }

        // bind active texture
        if (texture != activeTexture) {
            webGL.bindTexture(webGL.TEXTURE_2D, textureDefinitions[texture].webGLTexture);

            activeTexture = texture;
        }

        // draw
        webGL.drawArrays(webGL.TRIANGLES, 0, vertexVerts.length / 2);
    };

    var draw2DAnimation = function (renderPass, delta) {
        if (gfx2DAnimationInstances.length === 0) {
            return;
        }

        var webGLShaderProgram = webGLShaderPrograms[renderPass];
        var webGLVertexShaderExtraStep = webGLVertexShaderExtraSteps[renderPass];
        var webGLFragmentShaderExtraStep = webGLFragmentShaderExtraSteps[renderPass];

        var vertexVerts = [];
        var textureVerts = [];

        // draw 2d animation
        for (var i = 0; i < gfx2DAnimationInstances[renderPass].length; ++i) {
            var g = gfx2DAnimationInstances[renderPass][i];
            var gfxComp = g.graphics;
            var animationFrameDefinition = getAnimationFrameDefinitionOfGfxComp(gfxComp);

            // animate
            gfxComp.currentDuration += delta;
            if (animationFrameDefinition.duration != null && gfxComp.currentDuration > animationFrameDefinition.duration) {
                var animationStateDefinition = getAnimationStateDefinitionOfGfxComp(gfxComp);
                gfxComp.animationFrame = (gfxComp.animationFrame + 1) % animationStateDefinition.animationFrameDefinitions.length;
                animationFrameDefinition = animationStateDefinition.animationFrameDefinitions[gfxComp.animationFrame];
                gfxComp.setTextureCoords(animationFrameDefinition.texCoordTL, animationFrameDefinition.texCoordTR, animationFrameDefinition.texCoordBR, animationFrameDefinition.texCoordBL);
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
            var nextGfxComp = (i != gfx2DAnimationInstances[renderPass].length - 1) ? gfx2DAnimationInstances[renderPass][i + 1].graphics : null;
            var nextAnimationFrame = (nextGfxComp != null) ? getAnimationFrameDefinitionOfGfxComp(nextGfxComp) : null;
            if (nextAnimationFrame == null || animationFrameDefinition.texture != nextAnimationFrame.texture) {
                draw(vertexVerts, textureVerts, webGLShaderProgram, webGLVertexShaderExtraStep, webGLFragmentShaderExtraStep, animationFrameDefinition.texture);

                vertexVerts = [];
                textureVerts = [];
            }
        }
    };

    this.update = function (delta) {
        webGL.clear(webGL.COLOR_BUFFER_BIT | webGL.DEPTH_BUFFER_BIT);

        renderPasses.forEach(function (renderPass) {
            draw2DAnimation(renderPass, delta);
        });
    };

    var createGfx2DAnimationInstance = function (entity, gfxCompId) {
        var afd = getAnimationFrameDefinition(gfxCompId, 0, 0);
        var instance = new GraphicsComponentInstance2DAnimation(entity, gfxCompId, afd.width, afd.height);
        instance.graphics.setTextureCoords(afd.texCoordTL, afd.texCoordTR, afd.texCoordBR, afd.texCoordBL);

        var renderPass = gfx2DAnimationDefinitions[gfxCompId].renderPass;
        gfx2DAnimationInstances[renderPass].push(instance);

        messengerEngine.queueForPosting("createdGraphicsInstance", instance.graphics, instance.instanceId);
    };

    var createGfxFontInstance = function (entity, gfxCompId) {
        var instance = new GraphicsComponentInstanceFont(entity, gfxCompId);

        var renderPass = gfxFontDefinitions[gfxCompId].renderPass;
        gfxFontInstances[renderPass].push(instance);

        messengerEngine.queueForPosting("createdGraphicsInstance", instance.graphics, instance.instanceId);
    };

    var createGfxCompInstance = function (entity, gfxCompId) {
        switch (gfxCompTypeDefinitions[gfxCompId]) {
            case gfxCompType2DAnimation:
                createGfx2DAnimationInstance(entity, gfxCompId);
                break;

            case gfxCompTypeFont:
                createGfxFontInstance(entity, gfxCompId);
                break;
        }
    };

    var setShaderProgram = function (programName, renderPass) {
        var shaderDefinition = shaderList.firstOrNull(function (x) {
            return x.name === programName;
        });
        if (shaderDefinition !== undefined && shaderDefinition !== null) {
            webGLShaderPrograms[renderPass] = shaderDefinition.program;
            webGLVertexShaderExtraSteps[renderPass] = shaderDefinition.vertexShaderExtraSteps;
            webGLFragmentShaderExtraSteps[renderPass] = shaderDefinition.fragmentShaderExtraSteps;
        }
    };

    var getGfxInstance = function (instanceId, array) {
        var instance = null;
        for (var i = renderPasses[0], j = renderPasses[renderPasses.length - 1]; i < j; ++i) {
            if (instanceId > array[i][array[i].length - 1].instanceId) {
                continue;
            }
            instance = array[i].firstOrNull(function (x) {
                return x.instanceId === instanceId;
            });
            if (instance != null) {
                break;
            }
        }
        return instance;
    };

    var getGfxInstance2DAnimation = function (instanceId) {
        return getGfxInstance(instanceId, gfx2DAnimationInstances);
    };

    var getGfxInstanceFont = function (instanceId) {
        return getGfxInstance(instanceId, gfxFontInstances);
    };

    var setInstanceAnimationState = function (instanceId, animationState) {
        var gfxInstance = getGfxInstance2DAnimation(instanceId);
        if (gfxInstance != null) {
            gfxInstance.graphics.animationState = animationState;
        }
    };

    var setInstanceAnimationFrame = function (instanceId, animationFrame) {
        var gfxInstance = getGfxInstance2DAnimation(instanceId);
        if (gfxInstance != null) {
            gfxInstance.graphics.animationFrame = animationFrame;
        }
    };

    var setInstanceText = function (instanceId, text) {
        var gfxInstance = getGfxInstanceFont(instanceId);
        if (gfxInstance != null) {
            gfxInstance.graphics.setText(text);
        }
    };

    var getGfxCompInstanceForEntityInstance = function (instanceId) {
        var gfxCompInstance = getGfxInstance2DAnimation(instanceId);
        if (gfxCompInstance == null) {
            gfxCompInstance = getGfxInstanceFont(instanceId);
        }
        if (gfxCompInstance != null) {
            messengerEngine.queueForPosting("getGfxCompInstanceForEntityInstanceResponse", gfxCompInstance);
        }
    };

    var removeGfxCompInstanceFromMessage = function (instanceId) {
        for (var i = renderPasses[0], j = renderPasses[renderPasses.length - 1]; i < j; ++i) {
            if (instanceId > gfx2DAnimationInstances[i][gfx2DAnimationInstances[i].length - 1].instanceId) {
                continue;
            }
            for (var k = 0; k < gfx2DAnimationInstances[i].length; ++k) {
                if (gfx2DAnimationInstances[i][k].instanceId === instanceId) {
                    gfx2DAnimationInstances[i].splice(k, 1);
                    return;
                }
            }

            if (instanceId > gfxFontInstances[i][gfxFontInstances[i].length - 1].instanceId) {
                continue;
            }
            for (var k = 0; k < gfxFontInstances[i].length; ++k) {
                if (gfxFontInstances[i][k].instanceId === instanceId) {
                    gfxFontInstances[i].splice(k, 1);
                    return;
                }
            }
        }
    };

    messengerEngine.register("createGraphics", this, createGfxCompInstance);
    messengerEngine.register("setShaderProgram", this, setShaderProgram);
    messengerEngine.register("setInstanceAnimationState", this, setInstanceAnimationState);
    messengerEngine.register("setInstanceAnimationFrame", this, setInstanceAnimationFrame);
    messengerEngine.register("getGfxCompInstanceForEntityInstanceRequest", this, getGfxCompInstanceForEntityInstance);
    messengerEngine.register("removeEntityInstance", this, removeGfxCompInstanceFromMessage);
};

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
    GfxEngine.shaderElements.push(shaderScript);

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
    GfxEngine.shaderList = [];
    GfxEngine.shaderElements = [];

    var gfxShaderElements = GfxEngine.shaderElements;
    data.forEach(function (s) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", s.shaderFile);
        headElem.appendChild(script);
        gfxShaderElements.push(script);
    });
    var gfxShaderList = GfxEngine.shaderList;
    return new Promise(function (resolve, reject) {
        var checkShadersLoaded = function () {
            if (gfxShaderList.length == data.length) {
                resolve();
            } else {
                setTimeout(checkShadersLoaded, 1);
            }
        };
        setTimeout(checkShadersLoaded, 1);
    });
};

GfxEngine.unloadShaderScripts = function () {
    return new Promise(function (resolve, reject) {
        GfxEngine.shaderElements.forEach(function (e) {
            e.parentElement.removeChild(e);
        });
        GfxEngine.shaderElements = [];
        GfxEngine.shaderList = [];
        resolve();
    });
};