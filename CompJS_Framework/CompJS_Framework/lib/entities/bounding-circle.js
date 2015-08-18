
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

BoundingCircle.prototype.collideWithBoundingCircle = function (circle) {
    var dx = (this.position.x + this.origin.x) - (circle.position.x + circle.origin.x);
    var dy = (this.position.y + this.origin.y) - (circle.position.y + circle.origin.y);
    var distance = Math.sqrt((dx * dx) + (dy * dy));
    return distance < (this.radius + circle.radius);
};