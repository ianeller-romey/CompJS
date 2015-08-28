

String.prototype.isNullOrWhitespace = function () {
    return this === null || this.match(/^\s*$/) !== null;
};

Array.prototype.any = function (predicate) {
    var contains = false;
    for (var i = 0, len = this.length; i < len; ++i) {
        if (predicate(this[i])) {
            contains = true;
            break;
        }
    }
    return contains;
};

Array.prototype.firstOrNull = function (predicate) {
    var firstObject = null;
    for (var i = 0, len = this.length; i < len; ++i) {
        if (predicate(this[i])) {
            firstObject = this[i];
            break;
        }
    }
    return firstObject;
};

Array.prototype.select = function (predicate) {
    var selectArray = [];
    for (var i = 0, len = this.length; i < len; ++i) {
        selectArray.push(predicate(this[i]));
    }
    return selectArray;
};

Array.prototype.where = function (predicate) {
    var whereArray = [];
    for (var i = 0, len = this.length; i < len; ++i) {
        if (predicate(this[i])) {
            whereArray.push(this[i]);
        }
    }
    return whereArray;
};