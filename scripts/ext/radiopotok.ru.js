!function () {
    "use strict";

    function a() {
        var a = '.online-radio-add-button {cursor:pointer;width:40px;height:34px;padding:0px 10px !important;}.online-radio-add-button:after {content:"";display:block;width:16px;height:16px;background:#000;-webkit-mask:url("' + chrome.extension.getURL("images/38.png") + '") no-repeat center;-webkit-mask-size:16px 16px;}.item-multi-small .online-radio-add-button, .item-small .online-radio-add-button {width:23px;height:22px;padding:1px 4px 0 4px !important;}.item-multi-small .online-radio-add-button:after, .item-small .online-radio-add-button:after {width:13px;height:13px;-webkit-mask-size:13px 13px;}',
            b = document.createElement("style");
        b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
    }

    function b(a, b) {
        chrome.runtime.sendMessage({name: "background", action: a, data: "undefined" != typeof b ? b : null})
    }

    function c() {
        var a = document.querySelector("#playerPlayButton");
        if (a && a.classList.contains("player-stop")) {
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0), a.dispatchEvent(b)
        }
    }

    function d(a) {
        c();
        var d = document.getElementsByTagName("head")[0], e = a.parentNode.parentNode, f = [],
            g = e.querySelector("a[rel=canonical]"), h = d.querySelector('meta[property="og:url"]'),
            i = g && g.href || h && h.content, j = d.querySelector('meta[property="og:description"]'),
            k = a.dataset.title || g && g.textContent || j && j.content,
            l = e.parentNode.parentNode.querySelector(".img-thumbnail"),
            m = d.querySelector('meta[property="og:image"]'),
            n = l && l.src.replace("/s_", "/") || m && m.content.replace("/s_", "/");
        [a.dataset.stream1, a.dataset.stream2, a.dataset.stream3].forEach(function (a) {
            a && f.push(a)
        }), b("add", {title: "radiopotok.ru ● " + k, streams: f, image: n, url: i, name: i.replace(/\W/g, "")})
    }

    var e = document.querySelector(".btn-toolbar .btn-group .btn"), f = document.querySelector(".btn.play-radio");
    if (e && f) {
        a();
        var g = document.createElement("button");
        g.type = "button", g.className = "online-radio-add-button btn btn-default", g.title = chrome.i18n.getMessage("add"), g.onclick = d.bind(g, f), e.parentNode.insertBefore(g, e)
    }
}();