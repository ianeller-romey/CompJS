
var BoundingAABB = function (data) {
    this.origin = data.origin;
    this.halfValues = data.halfValues;
    this.position = {
        x: 0,
        y: 0
    };
};

BoundingAABB.prototype.clone = function () {
    return new BoundingAABB(this);
}

BoundingAABB.prototype.setPosition = function (position) {
    this.position.x = position.x;
    this.position.y = position.y;
};

BoundingAABB.prototype.collideWithBoundingAABB = function (rect) {
    var rectPosition = {
        x: this.position.x + this.origin.x,
        y: this.position.y + this.origin.y
    };
    var x1 = rectPosition.x - this.halfValues.x;
    var y1 = rectPosition.y - this.halfValues.y;
    var x2 = rectPosition.x + this.halfValues.x;
    var y2 = rectPosition.y + this.halfValues.y;

    var otherRectPosition = {
        x: rect.position.x + rect.origin.x,
        y: rect.position.y + rect.origin.y
    };
    var ox1 = otherRectPosition.x - rect.halfValues.x;
    var oy1 = otherRectPosition.y - rect.halfValues.y;
    var ox2 = otherRectPosition.x + rect.halfValues.x;
    var oy2 = otherRectPosition.y + rect.halfValues.y;

    return (x1 < ox2 &&
            x2 > ox1 &&
            y1 < oy2 &&
            y2 > oy1);
};

BoundingAABB.prototype.collideWithBoundingCircle = function (circle) {
    var circlePosition = {
        x: circle.position.x + circle.origin.x,
        y: circle.position.y + circle.origin.y
    };
    var rectPosition = {
        x: this.position.x + this.origin.x,
        y: this.position.y + this.origin.y
    };
    var x1 = rectPosition.x - this.halfValues.x;
    var y1 = rectPosition.y - this.halfValues.y;
    var x2 = rectPosition.x + this.halfValues.x;
    var y2 = rectPosition.y + this.halfValues.y;
    if (x1 <= circlePosition.x && circlePosition.x <= x2 && y1 <= circlePosition.y && circlePosition.y <= y2) {
        return true;
    }

    var circleDistance = {
        x: Math.abs(circlePosition.x - rectPosition.x),
        y: Math.abs(circlePosition.y - rectPosition.y)
    };
    if (circleDistance.x > (this.halfValues.width + circle.radius)) {
        return false;
    }
    if (circleDistance.y > (this.halfValues.height + circle.radius)) {
        return false;
    }
    if (circleDistance.x <= this.halfValues.width) {
        return true;
    }
    if (circleDistance.y <= this.halfValues.height) {
        return true;
    }

    return Math.pow(circleDistance.x - this.halfValues.width, 2) + Math.pow(circleDistance.y - this.halfValues.height, 2) <= (circle.radius * circle.radius);
};