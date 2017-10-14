require.config({
    baseUrl: "scripts",
    paths: {jquery: "lib/jquery.min"},
    waitSeconds: 0
}), require(["jquery", "utils/Translator"], function (a, b) {
    "use strict";

    function c(a, b) {
        chrome.runtime.sendMessage({name: "background", action: a, data: "undefined" != typeof b ? b : null})
    }

    function d(b) {
        var c = a('.station[data-name="' + b + '"]').addClass("favorite"), d = c.prev(),
            e = parseInt(c.outerHeight(), 10), f = parseInt(c.position().top, 10) + parseInt(o.scrollTop(), 10);
        c.addClass("move").css({top: f + "px"}), d.css({marginBottom: e + "px"}), a.when(o.animate({scrollTop: 0}, {
            duration: 500,
            queue: !1
        }), p.animate({paddingTop: e + "px"}, {duration: 500, queue: !1}), d.animate({marginBottom: 0}, {
            duration: 500,
            queue: !1
        }), c.animate({top: 0}, {duration: 500, queue: !1})).then(function () {
            p.css({paddingTop: 0}), d.css({marginBottom: 0}), c.prependTo(p).css("top", "auto").removeClass("move")
        }), q.toggleClass("favorite", q.data("name") === b)
    }

    function e(b) {
        var c = a('.station[data-name="' + b + '"]').removeClass("favorite"),
            d = c.is(":last-child") ? p.next(".station") : c.next(".station"), e = parseInt(c.outerHeight(), 10),
            f = parseInt(c.position().top, 10) + parseInt(o.scrollTop(), 10), g = parseInt(p.height(), 10) - e;
        c.addClass("move").css({top: f + "px"}), d.css({marginTop: e + "px"}), a.when(p.animate({paddingBottom: e + "px"}, {
            duration: 500,
            queue: !1
        }), d.animate({marginTop: 0}, {duration: 500, queue: !1}), c.animate({top: g + "px"}, {
            duration: 500,
            queue: !1
        })).then(function () {
            p.css({paddingBottom: 0}), d.css({marginTop: 0}), c.insertAfter(p).css("top", "auto").removeClass("move")
        }), q.toggleClass("favorite", q.data("name") !== b)
    }

    function f(c, d, e) {
        var f = n.isFavorite(c), g = a("<div/>", {"class": "station", "data-name": c}).toggleClass("favorite", f),
            h = a("<div/>", {"class": "image"}), i = a("<i/>", {"class": "icon icon-play", title: b.translate("play")}),
            j = a("<i/>", {"class": "icon icon-stop", title: b.translate("stop")}),
            k = a("<h3/>", {"class": "title", text: d}),
            l = a("<i/>", {"class": "icon icon-like", title: b.translate("like")}),
            m = a("<i/>", {"class": "icon icon-dislike", title: b.translate("dislike")});
        return setTimeout(function (a) {
            this.css("backgroundImage", a ? "url(" + a + ")" : "")
        }.bind(h, e), 50), g.append(h, i, j, l, m, k)
    }

    function g() {
        var a = q.find(".equalizer"), b = 3, c = 1, d = 1, e = parseInt(a.css("width"), 10),
            f = parseInt(a.css("height"), 10), g = Math.round(e / (c + b)), h = document.createElement("canvas");
        h.width = e, h.height = f, a.append(h);
        var i = h.getContext("2d"), j = i.createLinearGradient(0, 0, 0, f);
        j.addColorStop(1, "#0088cc"), j.addColorStop(.5, "#00719f"), j.addColorStop(0, "#005E84"), i.fillStyle = j;
        for (var k = 0; g > k; ++k) i.fillRect(k * (c + b), f, b, -d);
        !function l() {
            var a = m.getAudioData();
            i.clearRect(0, 0, e, f - d);
            for (var j = 0; g > j; ++j) {
                var k = Math.ceil(a[j] * f / 255);
                i.fillRect(j * (c + b), f, b, -k)
            }
            window.requestAnimationFrame(l, h)
        }()
    }

    function h(a, b, d) {
        var e = q.find(".icon-mute").show(), f = q.find(".icon-unmute").hide();
        a = 0 > a ? 0 : Math.min(a, 100), a || (e.hide(), f.show()), b && q.find(".volume > input").val(a), d || c("volume", a)
    }

    function i() {
        for (var a = n.getStations(), b = n.getFavorites(), c = 0, d = b.length; d > c; c++) {
            var e = b[c];
            a.hasOwnProperty(e) && !a[e].isHidden() && p.prepend(f(e, a[e].title, a[e].image))
        }
        for (var g in a) !a.hasOwnProperty(g) || n.isFavorite(g.toString()) || a[g].isHidden() || o.append(f(a[g].name, a[g].title, a[g].image))
    }

    function j() {
        o.on("click", ".station", function (b) {
            b.preventDefault(), c("play", a(this).data("name"))
        }).on("click", ".icon-like", function (b) {
            b.preventDefault(), b.stopPropagation();
            var e = a(this).parents(".station:first").data("name");
            c("like", e), d(e)
        }).on("click", ".icon-dislike", function (b) {
            b.preventDefault(), b.stopPropagation();
            var d = a(this).parents(".station:first").data("name");
            c("dislike", d), e(d)
        }), q.on("click", ".link", function (a) {
            a.preventDefault(), a.stopPropagation(), c("link", q.data("name"))
        }).on("click", ".icon-like", function (a) {
            a.preventDefault(), a.stopPropagation();
            var b = q.data("name");
            c("like", b), d(b)
        }).on("click", ".icon-dislike", function (a) {
            a.preventDefault(), a.stopPropagation();
            var b = q.data("name");
            c("dislike", b), e(b)
        }).on("change input", ".volume > input", function (a) {
            a.preventDefault(), a.stopPropagation(), h(a.target.value)
        }).on("click", ".icon-mute", function (a) {
            a.preventDefault(), a.stopPropagation(), h(0, !0)
        }).on("click", ".icon-unmute", function (a) {
            a.preventDefault(), a.stopPropagation(), h(n.getVolumeLast(), !0)
        }).on("mousewheel", function (a) {
            a.preventDefault();
            var b = n.getVolume(), c = 5, d = a.originalEvent.wheelDelta;
            d > 0 && 100 > b ? h(b + c, !0) : 0 > d && b > 0 && h(b - c, !0)
        }).on("click", ".icon-play-big, .icon-stop-big", function (a) {
            a.preventDefault(), a.stopPropagation(), c("play", q.data("name"))
        }).on("click", ".quality", function (b) {
            b.preventDefault(), b.stopPropagation(), c("stream", a(this).data("name"))
        }), a("#footer").on("click", ".icon-options", function (a) {
            a.preventDefault(), c("options")
        }).on("click", ".icon-add", function (a) {
            a.preventDefault(), c("options", "add")
        }).on("click", ".icon-feedback", function (a) {
            a.preventDefault(), chrome.tabs.create({url: "mailto:chrome@css3.su?Subject=Online%20Radio%20Extension"})
        }), a("#search").on("keyup paste search blur", ".search", function (b) {
            b.preventDefault(), b.stopPropagation();
            var c = this.value.toLowerCase();
            o.find(".station").hide().filter(function () {
                return a(this).children(".title").text().toLowerCase().indexOf(c) >= 0
            }).show()
        })
    }

    function k(c) {
        c = c || m.getStatus();
        var d = function () {
            f();
            var c = n.getLastStation();
            if (c) {
                var d = a('.station[data-name="' + c.name + '"]').addClass("active"),
                    e = q.find(".description").empty();
                q.addClass("buffering ready").toggleClass("favorite", d.hasClass("favorite")).data("name", c.name);
                var g = q.find(".title").text(c.title).removeClass("link");
                c.url && g.addClass("link").attr("title", b.translate("link")), setTimeout(function (a) {
                    this.css("backgroundImage", a ? "url(" + a + ")" : "")
                }.bind(q.find(".image"), c.image), 50);
                var h = Object.keys(c.streams), i = c.getStreamName();
                h.forEach(function (b) {
                    a("<button/>", {
                        "class": "quality",
                        text: isFinite(b) ? "♬" : b,
                        title: c.streams[b],
                        "data-name": b
                    }).appendTo(e).toggleClass("__active", i === b)
                })
            }
        }, e = function () {
            f(), q.addClass("error")
        }, f = function () {
            a(".active").removeClass("active"), q.removeClass("buffering playing error")
        }, g = function () {
            q.removeClass("buffering error").addClass("playing")
        };
        switch (q.hasClass("ready") || "buffering" === c || d(), c) {
            case"buffering":
                d();
                break;
            case"playing":
                g();
                break;
            case"stopped":
                f();
                break;
            case"error":
                e()
        }
    }

    function l() {
        var b = n.getLastStation();
        if (b) {
            var c = a('.station[data-name="' + b.name + '"]');
            o.scrollTop(o.scrollTop() + c.position().top - parseInt(c.outerHeight(), 10))
        }
    }

    var m = chrome.extension.getBackgroundPage(), n = m.getStorage(), o = a("#stations"), p = a("#favorites"),
        q = a("#player");
    chrome.runtime.onMessage.addListener(function (a) {
        a.name && "popup" === a.name && k(a.action)
    }), b.translateAll(), i(), j(), h(n.getVolume(), !0, !0), g(), k(), l()
});
function d(i) {
    return document.getElementById(i)
}
b = d("toggler");
c = d("collapse");
b.onclick = function () {
    s = c.style.display == "none";
    c.style.display = s ? "block" : "none";
    b.innerHTML = s ? "&#9650;" : "&#9660;"
}