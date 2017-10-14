define(["models/Station"], function (a) {
    "use strict";

    function b(a, b) {
        localStorage.setItem(a.toString(), b.toString())
    }

    function c(a) {
        e(a) || w.push(a), b("_favorites", JSON.stringify(w))
    }

    function d(a) {
        var c = w.indexOf(a);
        c >= 0 && w.splice(c, 1), b("_favorites", JSON.stringify(w))
    }

    function e(a) {
        return w.indexOf(a) >= 0
    }

    function f() {
        return w
    }

    function g(a) {
        w = a, b("_favorites", JSON.stringify(w))
    }

    function h() {
        var a, b = {};
        for (a in y) y.hasOwnProperty(a) && (b[a] = y[a]);
        for (a in z) z.hasOwnProperty(a) && (b[a] = z[a]);
        return b
    }

    function i(a) {
        return y.hasOwnProperty(a) ? y[a] : z.hasOwnProperty(a) ? z[a] : null
    }

    function j() {
        return JSON.stringify({stations: z})
    }

    function k(a) {
        try {
            if (a = JSON.parse(a), !a.stations) return !1;
            for (var b in a.stations) a.stations.hasOwnProperty(b) && r(a.stations[b]);
            return !0
        } catch (c) {
            return !1
        }
    }

    function l(a) {
        x = a, b("_last", x)
    }

    function m() {
        return x
    }

    function n() {
        return i(x)
    }

    function o() {
        return parseInt(B.current, 10) || 0
    }

    function p() {
        return parseInt(B.last, 10) || 80
    }

    function q(a) {
        var c = B.current;
        B = {current: a, last: c}, b("_volume", JSON.stringify(B))
    }

    function r(c) {
        return c.name || (c.name = (+new Date).toString() + Object.keys(z).length.toString()), z[c.name] = new a(c.name, c.title, c.url || "", c.streams, c.image || "", !0), b("_stations", JSON.stringify(z)), z[c.name]
    }

    function s(a) {
        z.hasOwnProperty(a) ? (delete z[a], b("_stations", JSON.stringify(z))) : y.hasOwnProperty(a) && (y[a].setHidden(!0), A[a] = 1, b("_hidden", JSON.stringify(A)))
    }

    function t(a) {
        A.hasOwnProperty(a) && (y[a].setHidden(!1), delete A[a], b("_hidden", JSON.stringify(A)))
    }

    function u(b, c) {
        var d = new XMLHttpRequest;
        d.onreadystatechange = function () {
            if (4 === d.readyState) {
                var b = JSON.parse(d.responseText);
                for (var c in b) b.hasOwnProperty(c) && (y[c] = new a(c, b[c].title, b[c].url, b[c].streams, b[c].image, !1, A.hasOwnProperty(c)))
            }
        }, c && (d.onerror = c), d.open("GET", b, !0), d.send()
    }

    function v() {
        var b = JSON.parse(localStorage.getItem("_stations")) || {};
        for (var c in b) b.hasOwnProperty(c) && (z[c] = new a(c, b[c].title, b[c].url, b[c].streams, b[c].image, !0))
    }

    var w = (JSON.parse(localStorage.getItem("_favorites")) || []).map(function (a) {
            return a.toString()
        }), x = localStorage.getItem("_last") || "", y = {}, z = {}, A = JSON.parse(localStorage.getItem("_hidden")) || {},
        B = JSON.parse(localStorage.getItem("_volume")) || {current: 80, last: 80};
    return u("https://data-oasis-182813.appspot.com/stations.json", function () {
        u(chrome.extension.getURL("stations.json"))
    }), v(), {
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