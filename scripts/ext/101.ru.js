!function () {
    "use strict";

    function a() {
        if (h && h.classList.contains("stop")) {
            var a = document.createEvent("MouseEvents");
            a.initEvent("click", !0, !0), h.dispatchEvent(a)
        }
    }

    function b() {
        var a = document.querySelector("#footer-player");
        return a && a.getAttribute("data-playlist")
    }

    function c() {
        var a = '.online-radio-add-button {background: #fff;display: inline-block;margin: 0 0 0 10px;width: 42px;height: 42px;cursor: pointer;-webkit-mask: url("' + chrome.extension.getURL("images/38.png") + '") no-repeat center bottom;-webkit-mask-size: 30px 30px;}.online-radio-add-button:hover {background: #ef8800;}#top-channel-block .ch-name h1 {width: auto;}',
            b = document.createElement("style");
        b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
    }

    function d(a, b) {
        var c = new XMLHttpRequest;
        c.onreadystatechange = function () {
            if (4 === c.readyState && 200 === c.status) {
                var a = JSON.parse(c.responseText), d = a.playlist.map(function (a) {
                    var b = document.createElement("a");
                    return b.href = a.file, b.origin + b.pathname
                });
                b(d.slice(0, 5))
            }
        }, c.open("GET", a, !0), c.send(null)
    }

    function e(a, b) {
        chrome.runtime.sendMessage({name: "background", action: a, data: "undefined" != typeof b ? b : null})
    }

    var f = document.querySelector("#top-channel-block"), g = f.querySelector(".ch-name"),
        h = f.querySelector(".player-control"), i = document.querySelector(".ch-about .h4 a"),
        j = g.querySelector("h1"), k = g.querySelector(".logo");
    if (g) {
        var l = b();
        if (l) {
            var m = document.createElement("span");
            m.className = "online-radio-add-button", m.title = chrome.i18n.getMessage("add"), m.onclick = function () {
                d(l, function (b) {
                    a(), e("add", {
                        title: j ? "101.ru ● " + j.innerText : "101.ru",
                        streams: b,
                        image: k && k.src,
                        url: i && i.href,
                        name: i && i.innerText
                    })
                })
            }, c(), g.insertBefore(m, j.nextSibling)
        }
    }
}();