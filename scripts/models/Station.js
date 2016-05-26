define(function () {
    "use strict";
    function a(a) {
        return a.reduce(function (a, b, c) {
            return a[c] = b, a
        }, {})
    }

    function b(b, c, d, e, f, g, h) {
        this.name = b, this.title = c, this.url = d, this.streams = Array.isArray(e) ? a(e) : e, this.image = f || "", this._userStation = !!g, this._hidden = !!h, this._currentStreamName = "0"
    }

    return b.prototype.getStreamName = function () {
        if (!this.streams[this._currentStreamName]) {
            var a = Object.keys(this.streams);
            this._currentStreamName = a[0].toString()
        }
        return this._currentStreamName
    }, b.prototype.getNextStream = function () {
        var a = Object.keys(this.streams), b = a.indexOf(this._currentStreamName), c = (b + 1) % a.length;
        return this.getStream(a[c])
    }, b.prototype.getStream = function (a) {
        return "undefined" != typeof a && (this._currentStreamName = a.toString()), this.streams[this.getStreamName()]
    }, b.prototype.isHidden = function () {
        return this._hidden
    }, b.prototype.setHidden = function (a) {
        this._hidden = !!a
    }, b.prototype.isUserStation = function () {
        return this._userStation
    }, b.prototype.isCoreStation = function () {
        return !this._userStation
    }, b
});