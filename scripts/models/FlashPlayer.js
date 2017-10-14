define(["models/DataStorage", "utils/Utils"], function (a, b) {
    "use strict";

    function c(a, b) {
        switch (a) {
            case"play":
            case"playing":
            case"abort":
            case"error":
            case"volumechange":
                o[a] = b;
                break;
            default:
                console.warn("Unsupported event type", a)
        }
    }

    function d(a, b) {
        l.postMessage({action: a, data: "undefined" != typeof b ? b : null})
    }

    function e(a) {
        m = a || m, d("play", m)
    }

    function f() {
        d("stop")
    }

    function g() {
        return Math.round(100 * n)
    }

    function h(a) {
        n = (a / 100).toFixed(2), d("volume", n)
    }

    function i() {
        return p
    }

    function j() {
        var a = 64, b = 30, c = 255, d = 5;
        this._freqByteData = this._freqByteData || [], this._audioDataCounter = ++this._audioDataCounter || 1;
        var e = this._audioDataCounter % 28 === 0 && p;
        e && (this._audioDataCounter = 1);
        for (var f = 0; a > f; ++f) if (e) {
            var g = Math.floor(Math.random() * (c - b + 1)) + b;
            (!this._freqByteData[f] || g > this._freqByteData[f]) && (this._freqByteData[f] = g)
        } else this._freqByteData[f] > 0 ? this._freqByteData[f] -= d : this._freqByteData[f] = 0;
        return this._freqByteData
    }

    function k() {
        console.info("Flash fallback");
        var c = document.createElement("iframe");
        c.id = "playerFallback", c.src = q, c.scrolling = "no", document.body.appendChild(c), chrome.runtime.onConnect.addListener(function (c) {
            "proxy" === c.name && (l = c, c.onMessage.addListener(function (c) {
                switch (c.action) {
                    case"ready":
                        h(a.getVolume());
                    case"playing":
                    case"play":
                    case"abort":
                    case"error":
                    case"volumechange":
                        p = "playing" === c.action, o.hasOwnProperty(c.action) && o[c.action]();
                        break;
                    case"flash":
                        b.openOptions("flash")
                }
            }))
        })
    }

    var l, m = null, n = 1, o = {}, p = !1, q = "http://radio.css3.su/";
    return {init: k, attachEvent: c, play: e, stop: f, setVolume: h, getVolume: g, isPlaying: i, getAudioData: j}
});