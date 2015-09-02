
if (VERTICES === undefined) {
    // these don't need to be Vector2D's
    var VERTICES = [ {
        x: 0.0, 
        y: 0.0
    }, {
        x: 1.0, 
        y: 0.0
    }, {
        x: 0.0, 
        y: 1.0
    }, {
        x: 0.0, 
        y: 1.0
    }, {
        x: 1.0, 
        y: 0.0
    }, {
        x: 1.0, 
        y: 1.0
    }];
}

if (FONT_DICTIONARY === undefined) {
    var FONT_DICTIONARY = {
        a: {
            column: 0,
            row: 0
        },
        b: {
            column: 1,
            row: 0
        },
        c: {
            column: 2,
            row: 0
        },
        d: {
            column: 3,
            row: 0
        },
        e: {
            column: 4,
            row: 0
        },
        f: {
            column: 5,
            row: 0
        },
        g: {
            column: 6,
            row: 0
        },
        h: {
            column: 7,
            row: 0
        },
        i: {
            column: 8,
            row: 0
        },
        j: {
            column: 9,
            row: 0
        },
        k: {
            column: 10,
            row: 0
        },
        l: {
            column: 11,
            row: 0
        },
        m: {
            column: 12,
            row: 0
        },
        n: {
            column: 13,
            row: 0
        },
        o: {
            column: 14,
            row: 0
        },
        p: {
            column: 15,
            row: 0
        },
        q: {
            column: 16,
            row: 0
        },
        r: {
            column: 17,
            row: 0
        },
        s: {
            column: 18,
            row: 0
        },
        t: {
            column: 19,
            row: 0
        },
        u: {
            column: 20,
            row: 0
        },
        v: {
            column: 21,
            row: 0
        },
        w: {
            column: 22,
            row: 0
        },
        column: {
            column: 23,
            row: 0
        },
        row: {
            column: 24,
            row: 0
        },
        z: {
            column: 25,
            row: 0
        },
        A: {
            column: 0,
            row: 1
        },
        B: {
            column: 1,
            row: 1
        },
        C: {
            column: 2,
            row: 1
        },
        D: {
            column: 3,
            row: 1
        },
        E: {
            column: 4,
            row: 1
        },
        F: {
            column: 5,
            row: 1
        },
        G: {
            column: 6,
            row: 1
        },
        H: {
            column: 7,
            row: 1
        },
        I: {
            column: 8,
            row: 1
        },
        J: {
            column: 9,
            row: 1
        },
        K: {
            column: 10,
            row: 1
        },
        L: {
            column: 11,
            row: 1
        },
        M: {
            column: 12,
            row: 1
        },
        N: {
            column: 13,
            row: 1
        },
        O: {
            column: 14,
            row: 1
        },
        P: {
            column: 15,
            row: 1
        },
        Q: {
            column: 16,
            row: 1
        },
        R: {
            column: 17,
            row: 1
        },
        S: {
            column: 18,
            row: 1
        },
        T: {
            column: 19,
            row: 1
        },
        U: {
            column: 20,
            row: 1
        },
        V: {
            column: 21,
            row: 1
        },
        W: {
            column: 22,
            row: 1
        },
        X: {
            column: 23,
            row: 1
        },
        Y: {
            column: 24,
            row: 1
        },
        Z: {
            column: 25,
            row: 1
        },
        "1": {
            column: 0,
            row: 2
        },
        "2": {
            column: 1,
            row: 2
        },
        "3": {
            column: 2,
            row: 2
        },
        "4": {
            column: 3,
            row: 2
        },
        "5": {
            column: 4,
            row: 2
        },
        "6": {
            column: 5,
            row: 2
        },
        "7": {
            column: 6,
            row: 2
        },
        "8": {
            column: 7,
            row: 2
        },
        "9": {
            column: 8,
            row: 2
        },
        "0": {
            column: 9,
            row: 2
        },
        " ": {
            column: 10,
            row: 2
        },
        ",": {
            column: asdfasdf,
            row: 3
        },
        ".": {
            column: asdfasdf,
            row: 3
        },
        "/": {
            column: asdfasdf,
            row: 3
        },
        "<": {
            column: asdfasdf,
            row: 3
        },
        ">": {
            column: asdfasdf,
            row: 3
        },
        "?": {
            column: asdfasdf,
            row: 3
        },
        ";": {
            column: asdfasdf,
            row: 3
        },
        "'": {
            column: asdfasdf,
            row: 3
        },
        ":": {
            column: asdfasdf,
            row: 3
        },
        '"': {
            column: asdfasdf,
            row: 3
        },
        "[": {
            column: asdfasdf,
            row: 3
        },
        "]": {
            column: asdfasdf,
            row: 3
        },
        "\\": {
            column: asdfasdf,
            row: 3
        },
        "{": {
            column: asdfasdf,
            row: 3
        },
        "}": {
            column: asdfasdf,
            row: 3
        },
        "|": {
            column: asdfasdf,
            row: 3
        },
        "`": {
            column: asdfasdf,
            row: 3
        },
        "-": {
            column: asdfasdf,
            row: 3
        },
        "=": {
            column: asdfasdf,
            row: 3
        },
        "~": {
            column: asdfasdf,
            row: 3
        },
        "!": {
            column: asdfasdf,
            row: 3
        },
        "@": {
            column: asdfasdf,
            row: 3
        },
        "#": {
            column: asdfasdf,
            row: 3
        },
        "$": {
            column: asdfasdf,
            row: 3
        },
        "%": {
            column: asdfasdf,
            row: 3
        },
        "^": {
            column: asdfasdf,
            row: 3
        },
        "&": {
            column: asdfasdf,
            row: 3
        },
        "*": {
            column: asdfasdf,
            row: 3
        },
        "(": {
            column: asdfasdf,
            row: 3
        },
        ")": {
            column: asdfasdf,
            row: 3
        },
        "_": {
            column: asdfasdf,
            row: 3
        },
        "+": {
            column: asdfasdf,
            row: 3
        }
    };
}

var GraphicsComponentFont = function (gfxCompId, startT, startL, characterWidth, characterHeight, textureWidth, text, transformation) {
    this.id = gfxCompId;
    this.textureWidth = textureWidth;
    this.startT = startT;
    this.startL = startL;
    this.characterWidth = characterWidth;
    this.characterHeight = characterHeight;
    this.vertices = [];
    this.textureCoords = [];

    var init = function () {
        var that = this;
        var verts = VERTICES;
        var fonts = FONT_DICTIONARY;
        var scaledVertices = [];
        var translatedVertices = [];

        verts.forEach(function (vert, i) {
            scaledVertices.push(new Vector2D(vert.x * that.characterWidth * transformation.scale.x, vert.y * that.characterHeight * transformation.scale.y));
        });

        that.vertices = translatedVertices;
        
        var updateScaledVertices = function (scale) {
            for (var i = 0; i < verts.length; ++i) {
                scaledVertices[i].x = verts[i].x * that.characterWidth * scale.x;
                scaledVertices[i].y = verts[i].y * that.characterHeight * scale.y;
            }
        };

        var updateTranslatedVertices = function (text, position) {
            var yOff = 0;
            var xOff = 0;
            for (var i = 0; i < translatedVertices.length; ++i, ++xOff) {
                if (text[i] === "\n") {
                    yOff += that.characterHeight;
                    xOff = 0;
                }
                for (var j = 0; j < verts.length; ++j) {
                    translatedVertices[i][j].x = scaledVertices[j].x + position.x + (xOff * that.characterWidth);
                    translatedVertices[i][j].y = scaledVertices[j].y + position.y + yOff;
                }
            }
        };

        var calculateTextureCoordinates = function (pixel) {
            return (2 * pixel + 1) / (2 * that.textureWidth);
        };

        var updateTextureCoords = function (text) {
            for (var i = 0; i < that.textureCoords.length; ++i) {
                    var letter = text[i];
                    var xOff = that.startL + (fonts[letter].column * that.characterWidth);
                    var yOff = that.startT + (fonts[letter].row * that.characterHeight);

                    /*var texturePixelVerts = [lft, top,
                                               rgt, top,
                                               lft, bot,
                                               lft, bot,
                                               rgt, top,
                                               rgt, bot];*/

                    that.textureCoords[i][0].x = calculateTextureCoordinates(xOff);
                    that.textureCoords[i][0].y = calculateTextureCoordinates(yOff);

                    that.textureCoords[i][1].x = calculateTextureCoordinates(xOff + that.characterWidth);
                    that.textureCoords[i][1].y = calculateTextureCoordinates(yOff);

                    that.textureCoords[i][2].x = calculateTextureCoordinates(xOff);
                    that.textureCoords[i][2].y = calculateTextureCoordinates(yOff + that.characterHeight);

                    that.textureCoords[i][3].x = calculateTextureCoordinates(xOff);
                    that.textureCoords[i][3].y = calculateTextureCoordinates(yOff + that.characterHeight);

                    that.textureCoords[i][4].x = calculateTextureCoordinates(xOff + that.characterWidth);
                    that.textureCoords[i][4].y = calculateTextureCoordinates(yOff);

                    that.textureCoords[i][5].x = calculateTextureCoordinates(xOff + that.characterWidth);
                    that.textureCoords[i][5].y = calculateTextureCoordinates(yOff + that.characterHeight);

            }
        };

        var updateText = function (text) {
            while(translatedVertices.length < text.length) {
                var i = translatedVertices.push(new Array(6));
                --i;
                var j = that.textureCoords.push(new Array(6));
                --j;
                verts.forEach(function (vert, k) {
                    translatedVertices[i][k] = new Vector2D(vert.x, vert.y);
                    that.textureCoords[j][k] = new Vector2D(vert.x, vert.y);
                });
            }
            while (translatedVertices.length > text.length) {
                translatedVertices.pop();
            }
            updateTranslatedVertices(text, transformation.position);
            updateTextureCoords(text);
        };

        transformation.scale.notifyMe(function (newScale) {
            updateScaledVertices(newScale);
        });

        transformation.position.notifyMe(function (newPosition) {
            updateTranslatedVertices(that.text, newPosition);
        });

        that.text.notifyMe(function (newText) {
            updateText(newText);
        });
    };
    init();

    this.text = text;
};

GraphicsComponentFont.prototype.setText = function (text) {
    this.text = this.text.setAndNotify(text);
};

var GraphicsComponentInstanceFont = function (entity, gfxCompId) {
    this.instanceId = entity.instanceId;
    this.entityTypeName = entity.typeName;
    this.transformation = entity.transformation;
    this.graphics = new GraphicsComponent2DAnimation(gfxCompId, this.transformation);
};
