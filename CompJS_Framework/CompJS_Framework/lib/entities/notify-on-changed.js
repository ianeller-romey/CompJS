
String.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

String.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Number.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Number.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Boolean.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Boolean.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Object.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Object.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Date.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Date.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Array.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Array.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};

Function.prototype.notifyMe = function (callback) {
    if (this._notifyMe == null) {
        this._notifyMe = [];
    }

    this._notifyMe.push(callback);
};

Function.prototype.setAndNotify = function (value) {
    var _notifyMe = this._notifyMe;
    if (_notifyMe != null) {
        _notifyMe.forEach(function (x) {
            x(value);
        });
    }
    this = value;
    this._notifyMe = _notifyMe;
};