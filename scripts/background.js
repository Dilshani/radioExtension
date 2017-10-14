require.config({
    baseUrl: "scripts",
    paths: {jquery: "lib/jquery.min"},
    waitSeconds: 0
}), chrome.runtime.onInstalled.addListener(function (a) {
    "use strict";
    require(["utils/Utils"], function (b) {
        b.checkUpdates(a)
    })
}), require(["utils/Utils", "models/DataStorage", "models/FlashPlayer", "models/HtmlPlayer", "utils/Translator"], function (a, b, c, d, e) {
    "use strict";

    function f() {
        p.attachEvent("play", function () {
            j(l.BUFFERING), h(m)
        }), p.attachEvent("playing", function () {
            n = 0, j(l.PLAYING), h(m)
        }), p.attachEvent("abort", function () {
            j(l.STOPPED), h(m)
        }), p.attachEvent("error", function () {
            if (m !== l.STOPPED) if (n++ < 10) {
                var a = b.getLastStation();
                p.play(a ? a.getNextStream() : null)
            } else n = 0, j(l.ERROR), h(m)
        })
    }

    function g(c) {
        var d, f, g, h, i, j = null, k = 5;
        if ("string" == typeof c) d = c; else {
            if (!c.name || "background" !== c.name) return;
            d = c.action, j = c.data
        }
        switch (d) {
            case"play":
                j === b.getLastName() && p.isPlaying() ? p.stop() : (b.setLast(j), p.play(b.getStationByName(j).getStream()));
                break;
            case"playpause":
                if (p.isPlaying()) p.stop(); else {
                    if (h = b.getLastStation(), !h) {
                        g = b.getStations();
                        for (i in g) if (g.hasOwnProperty(i)) {
                            b.setLast(i), h = g[i];
                            break
                        }
                    }
                    p.play(h.getStream())
                }
                break;
            case"prev":
            case"next":
                g = b.getStations();
                var l = Object.keys(g), m = l.length;
                i = b.getLastName() || ("next" === d ? l[m - 1] : l[0]);
                for (var n = 0; m > n; n++) if (l[n] === i) {
                    i = "next" === d ? l[(n + 1) % m] : l[(m + n - 1) % m];
                    break
                }
                b.setLast(i), p.play(g[i].getStream());
                break;
            case"volume":
                b.setVolume(j), p.setVolume(j);
                break;
            case"volumeup":
                f = p.getVolume(), 100 > f && p.setVolume(Math.min(f + k, 100));
                break;
            case"volumedown":
                f = p.getVolume(), f > 0 && p.setVolume(Math.max(f - k, 0));
                break;
            case"like":
                b.like(j);
                break;
            case"dislike":
                b.dislike(j);
                break;
            case"link":
                chrome.tabs.create({url: b.getStationByName(j).url});
                break;
            case"options":
                a.openOptions(j);
                break;
            case"add":
                h = b.addStation(j), b.setLast(h.name), p.play(h.getStream()), window.alert(h.title + "\n" + e.translate("added"));
                break;
            case"stream":
                h = b.getLastStation(), p.play(h.getStream(j))
        }
    }

    function h(a, b) {
        chrome.runtime.sendMessage({name: "popup", action: a, data: "undefined" != typeof b ? b : null})
    }

    function i(a) {
        chrome.tabs.get(a.tabId, function (b) {
            o.push({
                title: b.title,
                stream: a.url,
                favicon: b.favIconUrl,
                tabId: b.id,
                url: b.url
            }), o = o.slice(-15, o.length), k()
        })
    }

    function j(a) {
        switch (m = a || l.STOPPED, a) {
            case"buffering":
                chrome.browserAction.setIcon({
                    path: {
                        19: "images/19o.png",
                        38: "images/38o.png"
                    }
                }), chrome.browserAction.setTitle({title: b.getLastStation().title + " - " + e.translate("loading")});
                break;
            case"playing":
                chrome.browserAction.setIcon({
                    path: {
                        19: "images/19g.png",
                        38: "images/38g.png"
                    }
                }), chrome.browserAction.setTitle({title: b.getLastStation().title});
                break;
            case"stopped":
                chrome.browserAction.setIcon({
                    path: {
                        19: "images/19.png",
                        38: "images/38.png"
                    }
                }), chrome.browserAction.setTitle({title: b.getLastStation().title + " - " + e.translate("stopped")});
                break;
            case"error":
                chrome.browserAction.setIcon({
                    path: {
                        19: "images/19r.png",
                        38: "images/38r.png"
                    }
                }), chrome.browserAction.setTitle({title: b.getLastStation().title + " - " + e.translate("error")});
                break;
            default:
                chrome.browserAction.setIcon({
                    path: {
                        19: "images/19.png",
                        38: "images/38.png"
                    }
                }), chrome.browserAction.setTitle({title: e.translate("name")})
        }
    }

    function k() {
        chrome.contextMenus.removeAll(function () {
            var b = ["page", "frame", "selection"];
            chrome.contextMenus.create({
                title: e.translate("add"),
                contexts: b,
                enabled: !1
            }), chrome.contextMenus.create({type: "separator", contexts: b});
            var c = o.length;
            if (c) for (; c--;) chrome.contextMenus.create({
                title: o[c].title,
                contexts: b,
                onclick: a.openOptions.bind(null, "add#" + o[c].title + "#" + o[c].stream + "#" + o[c].url)
            }); else chrome.contextMenus.create({
                title: e.translate("please_enable_radio"),
                contexts: b,
                enabled: !1,
                id: "online_radio"
            })
        })
    }

    var l = {BUFFERING: "buffering", PLAYING: "playing", STOPPED: "stopped", ERROR: "error"}, m = l.STOPPED, n = 0,
        o = [], p = d;
    d.canPlayMP3(function (a) {
        a || (p = c), p.init(), chrome.runtime.onMessage.addListener(g), chrome.commands.onCommand.addListener(g), chrome.webRequest.onHeadersReceived.addListener(function (a) {
            for (var b = a.responseHeaders.length; b--;) if ("Content-Type" === a.responseHeaders[b].name) {
                "audio/mpeg" === a.responseHeaders[b].value && a.tabId > 0 && i(a);
                break
            }
        }, {urls: ["http://*/*", "https://*/*"], types: ["other", "object"]}, ["responseHeaders"]), k(), f(), j()
    }), window.getStatus = function () {
        return m
    }, window.getStorage = function () {
        return b
    }, window.getAudioData = function () {
        return p.getAudioData()
    }
});