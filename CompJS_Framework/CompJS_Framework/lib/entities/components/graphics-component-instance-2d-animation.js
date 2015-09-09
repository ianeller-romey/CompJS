
if (VERTICES === undefined) {
    // these don't need to be Vector2D's
    var VERTICES = [{
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

var GraphicsComponent2DAnimation = function (gfxCompId, width, height, transformation) {
    this.id = gfxCompId;
    this.animationState = 0;
    this.animationFrame = 0;
    this.currentDuration = 0;
    this.width = width;
    this.height = height;
    this.vertices = [];
    this.textureCoords = [];

    var that = this;
    var init = function () {
        var verts = VERTICES;
        var scaledVertices = [];
        var translatedVertices = [];

        verts.forEach(function (vert, i) {
            scaledVertices.push(new Vector2D(vert.x * that.width * transformation.scale.x, vert.y * that.height * transformation.scale.y));
            translatedVertices.push(new Vector2D(scaledVertices[i].x + transformation.position.x, scaledVertices[i].y + transformation.position.y));
        });

        that.vertices = translatedVertices;

        var updateScaledVertices = function (w, h, scale) {
            for (var i = 0; i < verts.length; ++i) {
                scaledVertices[i].x = verts[i].x * w * scale.x;
                scaledVertices[i].y = verts[i].y * h * scale.y;
            }
        };

        var updateTranslatedVertices = function (position) {
            for (var i = 0; i < verts.length; ++i) {
                translatedVertices[i].x = scaledVertices[i].x + position.x;
                translatedVertices[i].y = scaledVertices[i].y + position.y;
            }
        };

        that.width.notifyMe(function (newWidth) {
            updateScaledVertices(newWidth, that.height, transformation.scale);
        });

        that.height.notifyMe(function (newHeight) {
            updateScaledVertices(that.width, newHeight, transformation.scale);
        });

        transformation.scale.notifyMe(function (newScale) {
            updateScaledVertices(that.width, that.height, newScale);
        });

        transformation.position.notifyMe(function (newPosition) {
            updateTranslatedVertices(newPosition);
        });
    };
    init();
};

GraphicsComponent2DAnimation.prototype.setWidth = function (newWidth) {
    this.width = this.width.setAndNotify(newWidth);
};

GraphicsComponent2DAnimation.prototype.setHeight = function (newHeight) {
    this.height = this.height.setAndNotify(newHeight);
};

GraphicsComponent2DAnimation.prototype.setTextureCoords = function () {
    var top = arguments[0];
    var rgt = arguments[1];
    var bot = arguments[2];
    var lft = arguments[3];
    this.textureCoords = [lft, top,
            lft + (rgt - lft), top,
                          lft, top + (bot - top),
                          lft, top + (bot - top),
            lft + (rgt - lft), top,
            lft + (rgt - lft), top + (bot - top)];
};

var GraphicsComponentInstance2DAnimation = function (entity, gfxCompId, width, height) {
    this.instanceId = entity.instanceId;
    this.entityTypeName = entity.typeName;
    this.transformation = entity.transformation;
    this.graphics = new GraphicsComponent2DAnimation(gfxCompId, width, height, this.transformation);
};

GraphicsComponentInstance2DAnimation.prototype = new ComponentInstance();
