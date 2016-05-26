define(["models/DataStorage"], function (a) {
    "use strict";
    function b(a, b) {
        switch (a) {
            case"play":
            case"playing":
            case"abort":
            case"volumechange":
                k.addEventListener(a, b);
                break;
            case"error":
                k.addEventListener("error", b), k.addEventListener("stalled", b);
                break;
            default:
                console.warn("Unsupported event type", a)
        }
    }

    function c(a) {
        a = a || k.src, k.src = a, k.play()
    }

    function d() {
        k.pause(), k.src = ""
    }

    function e(a) {
        k.volume = (a / 100).toFixed(2)
    }

    function f() {
        return Math.round(100 * k.volume)
    }

    function g() {
        return !(k.paused || k.ended || 4 !== k.readyState && 2 !== k.networkState)
    }

    function h() {
        var a = function () {
            var a = new window.webkitAudioContext, b = a.createAnalyser();
            b.smoothingTimeConstant = .8, b.fftSize = 128;
            var c = a.createMediaElementSource(k);
            return c.connect(b), b.connect(a.destination), b
        }.bind(this);
        this._audioAnalyser = this._audioAnalyser || a();
        var b = new Uint8Array(this._audioAnalyser.frequencyBinCount);
        return this._audioAnalyser.getByteFrequencyData(b), b
    }

    function i(a) {
        try {
            var b = new Audio;
            b.canPlayType('audio/mpeg; codecs="mp3"') ? (b.addEventListener("canplaythrough", function () {
                a(!0)
            }, !1), b.addEventListener("error", function () {
                a(!1, this.error)
            }, !1)) : a(!1), b.src = "data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq", b.load()
        } catch (c) {
            a(!1, c)
        }
    }

    function j() {
        k = new Audio, k.preload = "auto", e(a.getVolume())
    }

    var k;
    return {
        init: j,
        attachEvent: b,
        play: c,
        stop: d,
        setVolume: e,
        getVolume: f,
        isPlaying: g,
        getAudioData: h,
        canPlayMP3: i
    }
});