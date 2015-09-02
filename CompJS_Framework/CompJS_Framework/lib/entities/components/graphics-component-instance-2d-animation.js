
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

    var init = function () {
        var that = this;
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

        this.width.notifyMe(function (newWidth) {
            updateScaledVertices(newWidth, that.height, transformation.scale);
        });

        this.height.notifyMe(function (newHeight) {
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

var GraphicsComponentInstance2DAnimation = function (entity, gfxCompId) {
    this.instanceId = entity.instanceId;
    this.entityTypeName = entity.typeName;
    this.transformation = entity.transformation;
    this.graphics = new GraphicsComponent2DAnimation(gfxCompId, this.transformation);
};
