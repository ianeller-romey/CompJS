

String.prototype.isNullOrWhitespace = function () {
    return this === null || this.match(/^\s*$/) !== null;
};

Array.prototype.addRange = function (range) {
    for (var i = 0, len = range.length; i < len; ++i) {
        this.push(range[i]);
    }
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

Array.prototype.contains = function (value) {
    return this.any(function (x) {
        return x === value;
    });
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

Array.prototype.distinct = function (predicate) {
    var distinctArray = [];
    for (var i = 0, len = this.length; i < len; ++i) {
        if (!distinctArray.contains(this[i])) {
            distinctArray.push(this[i]);
        }
    }
    return distinctArray;
};

Array.prototype.aggregate = function (predicate) {
    var aggregateValue = null;
    if (this.length > 0) {
        var i = 0;
        aggregateValue = this[i];
        for (var len = this.length; i < len; ++i) {
            aggregateValue = predicate(aggregateValue, this[i]);
        }
    }
    return aggregateValue;
};