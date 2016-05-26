define(["models/Station"], function (a) {
    "use strict";
    function b(a, b) {
        localStorage.setItem(a.toString(), b.toString())
    }

    function c(a) {
        e(a) || u.push(a), b("_favorites", JSON.stringify(u))
    }

    function d(a) {
        var c = u.indexOf(a);
        c >= 0 && u.splice(c, 1), b("_favorites", JSON.stringify(u))
    }

    function e(a) {
        return u.indexOf(a) >= 0
    }

    function f() {
        return u
    }

    function g(a) {
        u = a, b("_favorites", JSON.stringify(u))
    }

    function h() {
        var a, b = {};
        for (a in w)w.hasOwnProperty(a) && (b[a] = w[a]);
        for (a in x)x.hasOwnProperty(a) && (b[a] = x[a]);
        return b
    }

    function i(a) {
        return w.hasOwnProperty(a) ? w[a] : x.hasOwnProperty(a) ? x[a] : null
    }

    function j() {
        return JSON.stringify({stations: x})
    }

    function k(a) {
        try {
            if (a = JSON.parse(a), !a.stations)return !1;
            for (var b in a.stations)a.stations.hasOwnProperty(b) && r(a.stations[b]);
            return !0
        } catch (c) {
            return !1
        }
    }

    function l(a) {
        v = a, b("_last", v)
    }

    function m() {
        return v
    }

    function n() {
        return i(v)
    }

    function o() {
        return parseInt(z.current, 10) || 0
    }

    function p() {
        return parseInt(z.last, 10) || 80
    }

    function q(a) {
        var c = z.current;
        z = {current: a, last: c}, b("_volume", JSON.stringify(z))
    }

    function r(c) {
        return c.name || (c.name = (+new Date).toString() + Object.keys(x).length.toString()), x[c.name] = new a(c.name, c.title, c.url || "", c.streams, c.image || "", !0), b("_stations", JSON.stringify(x)), x[c.name]
    }

    function s(a) {
        x.hasOwnProperty(a) ? (delete x[a], b("_stations", JSON.stringify(x))) : w.hasOwnProperty(a) && (w[a].setHidden(!0), y[a] = 1, b("_hidden", JSON.stringify(y)))
    }

    function t(a) {
        y.hasOwnProperty(a) && (w[a].setHidden(!1), delete y[a], b("_hidden", JSON.stringify(y)))
    }

    var u = (JSON.parse(localStorage.getItem("_favorites")) || []).map(function (a) {
        return a.toString()
    }), v = localStorage.getItem("_last") || "", w = {}, x = {}, y = JSON.parse(localStorage.getItem("_hidden")) || {}, z = JSON.parse(localStorage.getItem("_volume")) || {
            current: 80,
            last: 80
        }, A = new XMLHttpRequest;
    A.onreadystatechange = function () {
        if (4 === A.readyState) {
            var b = JSON.parse(A.responseText);
            for (var c in b)b.hasOwnProperty(c) && (w[c] = new a(c, b[c].title, b[c].url, b[c].streams, b[c].image, !1, y.hasOwnProperty(c)))
        }
    }, A.open("GET", "http://mylightblog.appspot.com/stations.json", !0), A.send();
    var B = JSON.parse(localStorage.getItem("_stations")) || {};
    for (var C in B)B.hasOwnProperty(C) && (x[C] = new a(C, B[C].title, B[C].url, B[C].streams, B[C].image, !0));
    return {
        like: c,
        dislike: d,
        isFavorite: e,
        getFavorites: f,
        setFavorites: g,
        getStations: h,
        getStationByName: i,
        exportData: j,
        importData: k,
        setLast: l,
        getLastName: m,
        getLastStation: n,
        getVolume: o,
        getVolumeLast: p,
        setVolume: q,
        addStation: r,
        deleteStation: s,
        restoreStation: t
    }
});
