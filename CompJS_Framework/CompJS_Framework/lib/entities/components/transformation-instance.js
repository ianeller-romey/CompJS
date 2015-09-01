
var TransformationInstance = function (position, rotation, scale, velocity) {
    this.position = null;
    var initPosition = function () {
        var x = 0;
        var y = 0;
        if (position != null) {
            if (position.x != null) {
                x = position.x;
            }
            if (position.y != null) {
                y = position.y;
            }
        }
        this.position = new Vector2D(x, y);
    };

    this.rotation = null;
    var initRotation = function () {
        var rot = 0;
        if (rotation != null) {
            rot = rotation;
        }
        this.rotation = new Number(rot);
    };

    this.scale = null;
    var initScale = function () {
        var x = 1;
        var y = 1;
        if (scale != null) {
            if (scale.x != null) {
                x = scale.x;
            }
            if (scale.y != null) {
                y = scale.y;
            }
        }
        this.scale = new Vector2D(x, y);
    };

    this.velocity = null;
    var initVelocity = function () {
        var x = 0;
        var y = 0;
        if (velocity != null) {
            if (velocity.x != null) {
                x = velocity.x;
            }
            if (velocity.y != null) {
                y = velocity.y;
            }
        }
        this.velocity = new Vector2D(x, y);
    };

    initPosition();
    initRotation();
    initScale();
    initVelocity();
};

Transformation.prototype.setPosition = function (x, y) {
    this.position = this.position.setAndNotify(new Vector2D(x, y));
};

Transformation.prototype.setRotation = function (rot) {
    this.rotation = this.rotation.setAndNotify(rot);
};

Transformation.prototype.setScale = function (x, y) {
    this.scale = this.scale.setAndNotify(new Vector2D(x, y));
};

Transformation.prototype.setVelocity = function (x, y) {
    this.velocity = this.velocity.setAndNotify(new Vector2D(x, y));
};