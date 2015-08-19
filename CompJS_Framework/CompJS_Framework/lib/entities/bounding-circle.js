
var BoundingCircle = function (data) {
    this.origin = data.origin;
    this.radius = data.radius;
    this.position = {
        x: 0,
        y: 0
    };
};

BoundingCircle.prototype.clone = function () {
    return new BoundingCircle(this);
}

BoundingCircle.prototype.setPosition = function (position) {
    this.position.x = position.x;
    this.position.y = position.y;
};

BoundingCircle.prototype.collideWithBoundingAABB = function (rect) {
    var circlePosition = {
        x: this.position.x + this.origin.x,
        y: this.position.y + this.origin.y
    };
    var rectPosition = {
        x: rect.position.x + rect.origin.x,
        y: rect.position.y + rect.origin.y
    };
    var x1 = rectPosition.x - rect.halfValues.x;
    var y1 = rectPosition.y - rect.halfValues.y;
    var x2 = rectPosition.x + rect.halfValues.x;
    var y2 = rectPosition.y + rect.halfValues.y;
    if (x1 <= circlePosition.x && circlePosition.x <= x2 && y1 <= circlePosition.y && circlePosition.y <= y2) {
        return true;
    }

    var circleDistance = {
        x: Math.abs(circlePosition.x - rectPosition.x),
        y: Math.abs(circlePosition.y - rectPosition.y)
    };
    if (circleDistance.x > (rect.halfValues.width + this.radius)) {
        return false;
    }
    if (circleDistance.y > (rect.halfValues.height + this.radius)) {
        return false;
    }
    if (circleDistance.x <= rect.halfValues.width) {
        return true;
    }
    if (circleDistance.y <= rect.halfValues.height) {
        return true;
    }

    return Math.pow(circleDistance.x - rect.halfValues.width, 2) + Math.pow(circleDistance.y - rect.halfValues.height, 2) <= (this.radius * this.radius);
};

BoundingCircle.prototype.collideWithBoundingCircle = function (circle) {
    var dx = (this.position.x + this.origin.x) - (circle.position.x + circle.origin.x);
    var dy = (this.position.y + this.origin.y) - (circle.position.y + circle.origin.y);
    var distance = Math.sqrt((dx * dx) + (dy * dy));
    return distance < (this.radius + circle.radius);
};