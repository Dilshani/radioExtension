!function () {
    "use strict";
    function a() {
        var a = document.querySelector("#tuner"), b = a && a.querySelector(".playbutton-cont");
        if (b && a.classList.contains("playing")) {
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0), b.dispatchEvent(c)
        }
    }

    function b() {
        var a = '#online-radio-add-button {cursor:pointer;width:19px;min-width:19px;height:19px;min-height:19px;padding:5px 7px;margin:0 0 0 7px;border:1px solid #fff;border-radius:3px;}#online-radio-add-button:after {content:"";display:block;width:19px;height:19px;background:#fff;-webkit-mask:url("' + chrome.extension.getURL("images/38.png") + '") no-repeat center;-webkit-mask-size:19px 19px;}#online-radio-add-button:hover:after {background:#36b4a7;}#online-radio-add-button:active {background-color:#ddd;border:1px solid #ddd;}#online-radio-add-button:active:after {background:#000;}', b = document.createElement("style");
        b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
    }

    function c(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState && 200 === c.status) {
                var a = [], d = JSON.parse(c.responseText.slice(1, c.responseText.length - 2));
                d.Streams.filter(function (a) {
                    return "mp3" === a.MediaType.toLowerCase()
                }).sort(function (a, b) {
                    return a.Bandwidth < b.Bandwidth
                }).forEach(function (b) {
                    a.push(b.Url), "/" === b.Url[b.Url.length - 1] && a.push(b.Url + ";")
                }), b(a.slice(0, 6))
            }
        }, c.open("GET", a, !0), c.send(null)
    }

    function d(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState && 200 === c.status) {
                var a = c.responseText.match(/TuneIn.payload\s?=\s?(.+)/);
                b(a && a[1] ? JSON.parse(a[1]) : null)
            }
        }, c.open("GET", a, !0), c.send(null)
    }

    function e(a, b) {
        chrome.runtime.sendMessage({name: "background", action: a, data: "undefined" != typeof b ? b : null})
    }

    function f() {
        var b = document.querySelector("#online-radio-add-button");
        if (b)return !0;
        var f = document.querySelector("#fixable-header .hero-buttons");
        return f ? (d(g, function (h) {
            h && h.Station && h.Station.broadcast && (b = document.createElement("li"), b.id = "online-radio-add-button", b.className = "fl-l", b.title = chrome.i18n.getMessage("add"), b.onclick = function () {
                d(g, function (b) {
                    b && c(b.Station.broadcast.StreamUrl, function (c) {
                        a();
                        var d = b.Station.broadcast.ShareData.url || null, f = b.Station.broadcast.ShareData.title, g = b.Station.broadcast.ShareLogo;
                        e("add", {
                            title: f ? "tunein.com ● " + f : "tunein.com",
                            streams: c,
                            image: g,
                            url: d,
                            name: d.replace(/\W/g, "")
                        })
                    })
                })
            }, f.appendChild(b))
        }), !0) : !1
    }

    var g, h = !1;
    !function i() {
        window.location.href !== g ? (g = window.location.href, h = !1) : h || (h = f()), setTimeout(i, 100)
    }(), b()
}();