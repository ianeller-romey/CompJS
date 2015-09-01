
var Vector2D = function (x, y) {
    this.x = new Number(x);
    this.y = new Number(y);
};

Vector2D.prototype.distance2 = function (other) {
    var xDist = this.x - other.x;
    var yDist = this.y - other.y;
    return (xDist * xDist) + (yDist * yDist);
};

Vector2D.prototype.distance = function (other) {
    return Math.sqrt(this.distance2(other));
};

Vector2D.prototype.translateSelf = function (other) {
    this.x = this.x.setAndNotify(this.x + other.x);
    this.y = this.y.setAndNotify(this.y + other.y);
    return this;
};

Vector2D.prototype.translate = function (other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
};