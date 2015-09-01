
if (VERTICES === undefined) {
    var VERTICES = [new Vector2D(0.0, 0.0),
                    new Vector2D(1.0, 0.0),
                    new Vector2D(0.0, 1.0),
                    new Vector2D(0.0, 1.0),
                    new Vector2D(1.0, 0.0),
                    new Vector2D(1.0, 1.0)];
}

var GraphicsComponent2DAnimation = function (gfxCompId, transformation) {
    this.id = gfxCompId;
    this.animationState = 0;
    this.animationFrame = 0;
    this.currentDuration = 0;
    this.textureCoords = [];

    var initTransformationNotification = function () {
        var that = this;
        var vertices = VERTICES;
        /*
        [ 0.0, 0.0,
          1.0, 0.0,
          0.0, 1.0,
          0.0, 1.0,
          1.0, 0.0,
          1.0, 1.0 ]
        */
        transformation.position.notifyMe(function (newPosition) {
            var newCoords = [];
            vertices.forEach(function (vec) {
                newCoords.push(vec.translate(newPosition));
            });
            that.textureCoords = newCoords;
        });
    };
};

var GraphicsComponentInstance2DAnimation = function (entity, gfxCompId) {
    this.instanceId = entity.instanceId;
    this.entityTypeName = entity.typeName;
    this.transformation = entity.transformation;
    this.graphics = new GraphicsComponent2DAnimation(gfxCompId, this.transformation);
};
